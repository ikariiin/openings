import React from "react";
import useFetch from "use-http";
import config from "../../services/config/routes.json";
import { getQueryParam } from "../../services/misc/url-query";

export const AuthPage = () => {
  const { loading, data = null } = useFetch(
    `${process.env.API_BASE}${config["get-access-token"]}?code=${
      getQueryParam("code") ?? ""
    }`,
    {},
    [],
  );
  return (
    <section>
      {loading && <h1>Signing you in with anilist, just a moment</h1>}
      <pre>{data && JSON.stringify(data)}</pre>
    </section>
  );
};
