import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from "./features/About/About";
import Movies from "./features/Movies/Movies";
import MovieDetails from "./features/MovieDetail/MovieDetails";
import store from "./store";
import Home from "./features/Home/Home";
import { ErrorBoundary } from "./ErrorBoundary";


function AppEntryPoint(){
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </Provider>
  );

}

const router=createBrowserRouter([
  {
    path: "/",
    element: <AppEntryPoint/>,
    children:[
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/about",
      element: <About/>,
    },
    {
      path: "/movies",
      element: <Movies />,
    },
    {
      path: "/movies/:id",
      element: <MovieDetails/>,
    }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
