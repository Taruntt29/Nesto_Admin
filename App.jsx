import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouteData } from './data/Routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import AG_Grid_Table from './components/ui/Table/AG_Grid_Table';
import { Provider } from 'react-redux';
import store from './store/store';
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <ScrollToTop />
          <Routes>
            {RouteData.map(route => (
              <Route
                key={route.id}
                exact={route.exact}
                path={route.path}
                element={route.component}
              />
            ))}
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
