import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import CounterComponent from "../src/components/myc-counter.vue"

function match(wrapper, element, regex) {
    return Number(wrapper.find(element).text().match(regex)[1])
    return wrapper.find(element).text().match(regex)[1]
}
function expectEquality(a, b) {
    return expect(a).toBe(b)
}
function click(wrapper) {
    wrapper.find("button").trigger("click")
}
function xdescribe() {
    return 
}
xdescribe("CounterComponent", () => {
    it("should increment the counter when the button is clicked", async () => {
        const wrapper = mount(CounterComponent)
        await wrapper.find("button").trigger("click")

        const updatedCount = match(
            wrapper,
            "span",
            /Count: (\d+)/,
        )
        expectEquality(updatedCount, 2)
    })
    it("should equal 2", async () => {
        const wrapper = mount(CounterComponent)
        await click(wrapper)
        expect(wrapper.vm.count).toBe(2)
    })
    it("should have a prop value of abc = foo", () => {
        const wrapper = mount(CounterComponent, {
            props: { "abc": "foo" },
        })
        expectEquality(wrapper.vm.$props.abc, "foo")
        expectEquality(wrapper.vm.abc, "foo")
    })
})

const ButtonC = {
    template: `
        <div>
        <button foo = bar>howdy</button>
        </div>
    `
}
describe("finding a button", () => {
    it('aaa', () => {
        const wrapper = mount(ButtonC)
        const button = wrapper.find(`div > button`);
        expect(button.text()).toBe('howdy')
        expect(button.attributes('foo')).toBe('bar');
    })
})
