import { createMachine, EventObject, interpret } from "xstate";
import { useActor } from "@xstate/vue";
import { assign } from "xstate/lib/actions";
import { Profile, User } from "@/models";
import { Err } from "@/Err";
import profileService from "@/services/ProfileService";
import viewService from "@/services/ViewService";

const states = {
  idle: "idle",
  loading: "loading",
};

const events = {
  refresh: "refresh",
};

const services = {
  loadProfiles: "loadProfiles",
};

const actions = {
  notifyError: "notifyError",
  assignLoaded: "assignInit",
};

export interface ProfilesContext {
  profiles: Profile[] | null;
}

interface ProfilesEvent extends EventObject {
  type: string;
}

interface LoadedEvent extends ProfilesEvent {
  data: Profile[];
}

interface ErrEvent extends EventObject {
  data: Err;
}

const machine = createMachine(
  {
    id: "profiles",
    schema: {
      context: {} as ProfilesContext,
      events: {} as ProfilesEvent,
    },
    context: <ProfilesContext>{
      profiles: null,
    },
    initial: states.idle,
    states: {

      [states.idle]: {
        on: {
          [events.refresh]: {
            target: states.loading,
          },
        },
      },

      [states.loading]: {
        invoke: {
          src: services.loadProfiles,
          onDone: {
            actions: [actions.assignLoaded],
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
      [actions.notifyError]: (_context: ProfilesContext, event: ErrEvent) =>
        viewService.notify(event.data.format()),

      [actions.assignLoaded]: assign((_context, event: LoadedEvent) => <ProfilesContext>{
        profiles: event.data,
      }),
    },
    services: {
      [services.loadProfiles]: async (_context: ProfilesContext, event: LoadedEvent) => {
        const profiles = await profileService.getProfiles();
        return profiles;
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
    profilesState: state,
    profilesActions: {
      refresh: (force = false) => {
        if (!force && state.value.context.profiles) {
          return;
        }
        service.send(events.refresh);
      },
    },
  };
};

export default use;
