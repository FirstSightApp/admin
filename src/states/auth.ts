import { createMachine, EventObject, interpret } from "xstate";
import { useActor } from "@xstate/vue";
import { assign } from "xstate/lib/actions";
import { User } from "@/models";
import { Err } from "@/Err";
import useRoute from "@/states/route";
import authService from "@/services/AuthService";
import viewService from "@/services/ViewService";

const {
  routeState,
  routeActions,
} = useRoute();

const states = {
  refresh: "refresh",
  signingIn: "signingIn",
  signingOut: "signingOut",
  guest: "guest",
  authenticated: "authenticated",
};

const events = {
  any: "*",
  refresh: "refresh",
  login: "login",
  logout: "logout",
};

const services = {
  signIn: "signIn",
  signOut: "signOut",
};

const guards = {
  isAuthenticated: "isAuthenticated",
};

const actions = {
  notifyError: "notifyError",
  assignInit: "assignInit",
  assignAuthenticated: "assignAuthenticated",
  assignSignOut: "assignSignOut",
  sendNavigate: "sendNavigate",
  sendNavigateLogout: "sendNavigateLogout",
};

export interface AuthContext {
  user: User | null;
}

interface AuthEvent extends EventObject {
  type: string;
}

interface SignInEvent extends AuthEvent {
  email: string;
  password: string;
}

interface SignedInEvent extends AuthEvent {
  data: User;
}

interface ErrEvent extends EventObject {
  data: Err;
}

const machine = createMachine(
  {
    id: "context",
    schema: {
      context: {} as AuthContext,
      events: {} as AuthEvent,
    },
    context: <AuthContext>{
      user: null,
    },
    initial: states.guest,
    states: {

      [states.refresh]: {
        always: [
          {
            cond: guards.isAuthenticated,
            actions: actions.assignInit,
            target: states.authenticated,
          },
          {
            target: states.guest,
            actions: [actions.assignSignOut, actions.sendNavigateLogout],
          },
        ],
      },

      [states.signingIn]: {
        invoke: {
          src: services.signIn,
          onDone: {
            actions: [actions.assignAuthenticated, actions.sendNavigate],
            target: states.authenticated,
          },
          onError: {
            actions: actions.notifyError,
            target: states.guest,
          },
        },
      },

      [states.signingOut]: {
        invoke: {
          src: services.signOut,
          onDone: {
            actions: [actions.assignSignOut, actions.sendNavigateLogout],
            target: states.guest,
          },
          onError: {
            actions: actions.notifyError,
            target: states.authenticated,
          },
        },
      },

      [states.guest]: {
        on: {
          [events.refresh]: {
            target: states.refresh,
          },
          [events.login]: {
            target: states.signingIn,
          },
        },
      },

      [states.authenticated]: {
        on: {
          [events.logout]: {
            target: states.signingOut,
          },
        },
      },

    }
  },
  {
    guards: {
      [guards.isAuthenticated]: (_context) => !!authService.getUser(),
    },
    actions: {
      [actions.notifyError]: (_context: AuthContext, event: ErrEvent) =>
        viewService.notify(event.data.format()),

      [actions.assignInit]: assign((_context, _event: AuthEvent) => <AuthContext>{
        user: authService.getUser(),
      }),

      [actions.assignAuthenticated]: assign((_context, event: SignedInEvent) => <AuthContext>{
        user: event.data,
      }),

      [actions.assignSignOut]: assign((_context, _event: AuthEvent) => <AuthContext>{
        user: null,
      }),

      [actions.sendNavigate]: (_context, _event: SignedInEvent) => {
        routeActions.navigate("/");
      },

      [actions.sendNavigateLogout]: (_context, _event: AuthEvent) => {
        routeActions.navigate("/login");
      },
    },
    services: {
      [services.signIn]: async (_context: AuthContext, event: SignInEvent) => {
        const user = await authService.signIn(event.email, event.password);
        return user;
      },
      [services.signOut]: async (_context: AuthContext, event: AuthEvent) => {
        await authService.signOut();
      },
    },
  },
);

let service = interpret(machine).start();

const use = () => {
  const {
    state,
    send,
  } = useActor(service);

  return {
    authState: state,
    authActions: {
      refresh: () => {
        service.send(events.refresh);
      },

      login: (email: string, password: string) => {
        service.send(events.login, {email: email, password: password});
      },

      logout: () => {
        send(events.logout);
      },
    },
  };
};

export default use;
