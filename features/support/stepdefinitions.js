const {Given, When, Then} = require("cucumber")
const {ClientFunction} = require("testcafe")
const browser = require("./../../clienthelpers")
const Navigation = require("./../../pageObjects/navigation.page")
const PDP = require("./../../pageObjects/pdp.page")
const MiniBag = require("./../../pageObjects/minibag.page")
const SignIn = require("./../../pageObjects/signin.page")
const DeliveryPage = require("./../../pageObjects/delivery.page")

Given("I am on a page", async (table) => {
    await testController.navigateTo("http://local.m.us.topshop.com:8080")

    await ClientFunction(() => {
        document.cookie="featuresOverride={\"FEATURE_NEW_CHECKOUT\":true}"
        location.reload()
    }).with({boundTestRun: testController})()
    console.log(table.hashes())
})

When("I search for a product code", async () => {
    const navBar = new Navigation()
    await navBar.search("61T50MSLV")
})

When("I add the product to the bag", async () => {
    const pdp = new PDP()
    await pdp.addProductToBag()
})

When("I dismiss the add to bag confirmation modal", async () => {
    const pdp = new PDP()
    await pdp.dismissAddToBagConfirmationModal()
})

When("I view the bag", async () => {
    const navBar = new Navigation()
    await navBar.openMiniBag()
})

When("I proceed to checkout from the {string}", async (location) => {
    if (location === "minibag") {
        const minibag = new MiniBag()
        await minibag.goToCheckout()
    }
})

When("I register {string}", async (checkoutChoice) => {
    const signinpage = new SignIn()
    await signinpage.registerDuringCheckout()
})

When("I choose {string} as the delivery option", async (deliveryOption) => {
    const deliverypage = new DeliveryPage()
    if (deliveryOption === "Home Express") {
        await deliverypage.chooseHomeExpress()
    }
})