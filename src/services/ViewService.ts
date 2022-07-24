import { Err } from "@/Err";
import { router } from "@/router";

class ViewService {
  getRoute = (): string => {
    return router.currentRoute.value.fullPath;
  };

  navigate = async (path: string) => {
    const currentRoute = this.getRoute();
    if (path === currentRoute) {
      return;
    }

    const result = await router.push(path);

    // Error.
    if (result) {
      throw new Err(null, `Navigation error: ${result}`);
    }
  };

  notify = (message: string) => {
    console.log(`NOTIFICATION: ${message}`);
  };
}

const service = new ViewService();
export default service;
