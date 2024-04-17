const Password = {
    template: `
    <div>
      <input v-model="password">
      <div v-if="error">{{ error }}</div>
    </div>
  `,
    props: {
        minLength: {
            type: Number,
        },
    },
    computed: {
        error() {
            if (this.password.length < this.minLength) {
                return `Password must be at least ${this.minLength} characters.`
            }
            return
        },
    },
}

describe("aaaa", () => {
    it("renders an error if length is too short", () => {
        const wrapper = mount(Password, {
            props: {
                minLength: 10,
            },
            data() {
                return {
                    password: "short",
                }
            },
        })

        expect(wrapper.html()).toContain(
            "Password must be at least 10 characters",
        )
    })
})



// how to write a test
// do not test implementation details
test('text updates on clicking', async () => {
  const wrapper = mount(Counter)

  expect(wrapper.text()).toContain('Times clicked: 0')

  const button = wrapper.find('button')
  await button.trigger('click')
  await button.trigger('click')

  expect(wrapper.text()).toContain('Times clicked: 2')
})
