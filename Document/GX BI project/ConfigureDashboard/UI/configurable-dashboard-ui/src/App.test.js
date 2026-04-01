import { shallow } from "enzyme";
import App from "./container/App";
import { BrowserRouter } from "react-router-dom";

describe("<App />", () => {
  let component;
  beforeAll(() => {
    component = shallow(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
  it("Should test  phoneElement", () => {
    expect(component).toBeDefined();
  });
});
