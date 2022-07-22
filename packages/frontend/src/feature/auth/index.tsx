import { AuthResponseDto } from "common";
import React from "react";
import useFetch from "use-http";
import config from "../../services/config/routes.json";
import { apiUrl } from "../../services/misc/generate-api-url";
import { getQueryParam } from "../../services/misc/url-query";
import { saveStore } from "../../services/store";

export const AuthPage = () => {
  const { loading, data = null } = useFetch<AuthResponseDto>(
    `${apiUrl(config["get-access-token"])}?code=${getQueryParam("code") ?? ""}`,
    {},
    [],
  );

  React.useEffect(() => {
    if (data) {
      saveStore<AuthResponseDto>("auth", data);
    }
  }, [data]);

  return (
    <section>
      {loading && <h1>Signing you in with anilist, just a moment</h1>}
      <pre>{data && JSON.stringify(data)}</pre>
    </section>
  );
};
