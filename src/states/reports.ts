import { createMachine, EventObject, interpret } from "xstate";
import { useActor } from "@xstate/vue";
import { assign } from "xstate/lib/actions";
import { Profile, Report, User } from "@/models";
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
  load: "load",
};

const actions = {
  notifyError: "notifyError",
  assignLoaded: "assignInit",
};

export interface ReportsContext {
  reports: Report[] | null;
}

interface ReportsEvent extends EventObject {
}

interface LoadedEvent extends ReportsEvent {
  data: Report[];
}

interface ErrEvent extends ReportsEvent {
  data: Err;
}

const machine = createMachine(
  {
    id: "profiles",
    schema: {
      context: {} as ReportsContext,
      events: {} as ReportsEvent,
    },
    context: <ReportsContext>{
      reports: null,
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
          src: services.load,
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
      [actions.notifyError]: (_context: ReportsContext, event: ErrEvent) =>
        viewService.notify(event.data.format()),

      [actions.assignLoaded]: assign((_context, event: LoadedEvent) => <ReportsContext>{
        reports: event.data,
      }),
    },
    services: {
      [services.load]: async (_context: ReportsContext, event: LoadedEvent) => {
        const reports = await profileService.getReports();
        return reports;
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
    reportsState: state,
    reportsActions: {
      refresh: (force = false) => {
        if (!force && state.value.context.reports) {
          return;
        }
        service.send(events.refresh);
      },
    },
  };
};

export default use;
