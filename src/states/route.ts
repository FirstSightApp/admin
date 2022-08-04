import { createMachine, EventObject, interpret } from "xstate";
import { useActor } from "@xstate/vue";
import { assign } from "xstate/lib/actions";
import { Err } from "@/Err";
import viewService from "@/services/ViewService";

const states = {
  idle: "idle",
  navigating: "navigating",
};

const events = {
  navigate: "navigate",
};

const services = {
  navigate: "navigate",
};

const actions = {
  notifyError: "notifyError",
  assignNavigation: "assignNavigation",
};

export interface RouteContext {
  endpoint: string;
}

interface RouteEvent extends EventObject {
  type: string;
}

interface ErrEvent extends EventObject {
  data: Err;
}

interface NavigationEvent extends RouteEvent {
  path: string;
}

interface NavigatedEvent extends RouteEvent {
  data: string;
}

const machine = createMachine(
  {
    id: "route",
    schema: {
      context: {} as RouteContext,
      events: {} as RouteEvent,
    },
    context: <RouteContext>{
      endpoint: "/",
    },
    initial: states.idle,
    states: {

      [states.idle]: {
        on: {
          [events.navigate]: {
            target: states.navigating,
          },
        },
      },

      [states.navigating]: {
        invoke: {
          src: services.navigate,
          onDone: {
            actions: actions.assignNavigation,
            target: states.idle,
          },
          onError: {
            actions: actions.notifyError,
            target: states.idle,
          },
        },
      },

    }
  },
  {
    guards: {
    },
    actions: {
      [actions.notifyError]: (_context: RouteContext, event: ErrEvent) =>
        viewService.notify(event.data.format()),

      [actions.assignNavigation]: assign((_context, event: NavigatedEvent) => <RouteContext>{
        endpoint: event.data,
      }),
    },
    services: {
      [services.navigate]: async (_context: RouteContext, event: NavigationEvent) => {
        await viewService.navigate(event.path);
        return event.path;
      },
    },
  },
);

const service = interpret(machine).start();

const use = () => {
  if (!service) {
  }

  const {
    state,
  } = useActor(service);

  return {
    routeState: state,
    routeActions: {
      navigate: (path: string) => {
        service.send(events.navigate, {path: path});
      },
    },
  };
};

export default use;
