import logo from "./logo.svg";
import "./App.css";
import { TodoMain, TodoInput, TodoList } from "./comps";
import { LoginRoute, LoginForm, AuthRoute } from "./comps";
import { Route } from "react-router-dom";
import { UserContextProvider } from "./context";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {/*  TodoMain.jsx Layout을 사용하여 TODO 화면을 구현   */}
      <UserContextProvider>
        <LoginRoute>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/">
            <AuthRoute>
              <TodoMain header="TO DO LIST" form={<TodoInput />}>
                <TodoList />
              </TodoMain>
            </AuthRoute>
          </Route>
        </LoginRoute>
      </UserContextProvider>
    </div>
  );
}

export default App;
