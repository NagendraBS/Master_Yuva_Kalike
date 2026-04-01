import { shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Enterprise from './Enterprise'

describe("<Enterprise />", () => {
  let component;
  beforeAll(() => {
    component = shallow(
      <BrowserRouter>
        <Enterprise />
      </BrowserRouter>
    );
  });
  it("Should test Enterprise component", () => {
    expect(component).toBeDefined();
  });
  it("Should test heading", () => {
    expect(component.find('h3')).toEqual("Enterprise");
  });
});