import {mount} from "@vue/test-utils";
import GuessAge from "../src/components/myc2-age.vue";

test("Button clicked", async () => {

  const wrapper = mount(GuessAge, {
    props: {
      title: "Guess the users age",
      foo: 'sam',
    },
  });
  const verifyClick = await wrapper.get("button").trigger("click");
  expect(wrapper.vm.user.search).toEqual("A");
});
