import { useUserContext } from "../context";
import { useHistory } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { fetchUser } from "../modules/fetchModule";

function AuthRoute({ children }) {
  const { user, setUser } = useUserContext();
  const history = useHistory();

  const fetchCallback = useCallback(async () => {
    await window.gapi.auth2.init({
      client_id: "711952279142-6jbvgq0ualkue79i1n2a19q0fir8bq82.apps.googleusercontent.com",
      scope: "profile email",
    });
    if (!window.gapi) {
      alert("google API Not Found");
      history.replace("/login");
    }
    //gapi(google API)로부터 auth2 객체를 조회하기
    const auth2 = window?.gapi?.auth2.getAuthInstance();
    if (!auth2) {
      history.replace("/login");
    }
    // auth2가 정상적으로 추출이 됐다면
    // 로그인 되어있는 사용자 정보 getter하기
    const googleUser = await auth2.currentUser.get();

    const profile = await googleUser.getBasicProfile();

    // profile의 정보가 없다면 로그인으로 넘기기
    if (!profile) {
      history.replace("/login");
    }

    const user = {
      email: profile.getEmail(),
      id: profile.getId(),
      name: profile.getName(),
      image: profile.getImageUrl(),
      Token: googleUser.getAuthResponse().id_token,
    };

    setUser(user);
  }, [history, setUser]);
  useEffect(fetchCallback, [fetchCallback]);
  return <>{children}</>;
}

export default AuthRoute;
