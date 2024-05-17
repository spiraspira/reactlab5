import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Footer from "../components/Footer";

configure({ adapter: new Adapter() });

describe("Footer", () => {
  it("matches the snapshot", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});