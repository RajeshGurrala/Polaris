import {AccountPage} from "../AccountPage"
import { CartPage } from "../CartPage"
import { CheckoutPage } from "../CheckoutPage"
import { HandToolsPage } from "../HandToolsPage"
import { HeaderPanel } from "../HeaderPanel"
import { LoginPage } from "../LoginPage"
import { ProductDetailPage } from "../ProductDetailPage"
import { UsersPage } from "../UsersPage"
import {test as base} from "@playwright/test"

type MyFixtures={
    accountPage:AccountPage
    cartPage:CartPage
    checkoutPage:CheckoutPage
    handToolsPage:HandToolsPage
    headerPanel:HeaderPanel
    productDetailPage:ProductDetailPage
    usersPage:UsersPage
    loginPage:LoginPage

}

    export const test= base.extend<MyFixtures>({
        accountPage:async({page},use)=>{
        await use(new AccountPage(page))},
        cartPage: async({page},use)=>{
        await use(new CartPage(page))},
        checkoutPage:async({page},use)=>{
        await use(new CheckoutPage(page))},
        handToolsPage:async({page},use)=>{
        await use (new HandToolsPage(page))},
        headerPanel:async({page},use)=>{
        await use(new HeaderPanel(page))},
        productDetailPage:async({page},use)=>{
        await use (new ProductDetailPage(page))},
        usersPage:async({page},use)=>{
        await use(new UsersPage(page))},
        loginPage:async({page},use)=>{
        await use(new LoginPage(page))},
        })
