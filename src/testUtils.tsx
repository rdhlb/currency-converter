import { render, RenderOptions } from '@testing-library/react';
import { MockedProvider as MockedApolloProvider, MockedResponse } from '@apollo/client/testing';
import { createMemoryHistory, History } from 'history';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';

type CreateProvidersWrapper = (
  history: History<unknown>,
  storeInitialState?: any,
  graphQLMocks?: MockedResponse[],
) => React.FC;

const createProvidersWrapper: CreateProvidersWrapper =
  (history, storeInitialState = {}, graphQLMocks = []) =>
  ({ children }) => {
    return (
      <MockedApolloProvider mocks={graphQLMocks}>
        <Router history={history}>{children}</Router>
      </MockedApolloProvider>
    );
  };

type CustomerRendererOptions = {
  graphQLMocks?: MockedResponse[];
  initialState?: any;
  renderOptions?: RenderOptions;
  initialRoute?: string;
};

const customRender = (
  ui: any,
  {
    initialState,
    graphQLMocks,
    initialRoute = '/',
    ...renderOptions
  }: CustomerRendererOptions = {},
) => {
  // we use memory history here to avoid collisions with mutable browser history
  const history = createMemoryHistory({ initialEntries: [initialRoute] });

  return {
    ...render(ui, {
      wrapper: createProvidersWrapper(history, initialState, graphQLMocks),
      ...renderOptions,
    }),
    history, // we return history along with render result to be able to make assertions on history object
  };
};

export * from '@testing-library/react';
export { customRender as render };
