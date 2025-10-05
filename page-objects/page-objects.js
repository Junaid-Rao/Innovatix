const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }
}

class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToInventoryPage() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async getInventoryItems() {
    return await this.page.locator('.inventory_item').all();
  }

  async getItemName(itemIndex) {
    const items = await this.getInventoryItems();
    return await items[itemIndex].locator('.inventory_item_name').textContent();
  }

  async getItemPrice(itemIndex) {
    const items = await this.getInventoryItems();
    return await items[itemIndex].locator('.inventory_item_price').textContent();
  }

  async addItemToCart(itemIndex) {
    const items = await this.getInventoryItems();
    await items[itemIndex].locator('button').click();
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent());
    }
    return 0;
  }

  async clickCartIcon() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async selectSortOption(option) {
    await this.page.selectOption('.product_sort_container', option);
  }

  async clickMenuButton() {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async clickLogoutLink() {
    await this.page.locator('#logout_sidebar_link').click();
  }

  async getAddToCartButtonText(itemIndex) {
    const items = await this.getInventoryItems();
    return await items[itemIndex].locator('button').textContent();
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async getCartItems() {
    return await this.page.locator('.cart_item').all();
  }

  async getCartItemName(itemIndex) {
    const items = await this.getCartItems();
    return await items[itemIndex].locator('.inventory_item_name').textContent();
  }

  async getCartItemPrice(itemIndex) {
    const items = await this.getCartItems();
    return await items[itemIndex].locator('.inventory_item_price').textContent();
  }

  async getCartItemQuantity(itemIndex) {
    const items = await this.getCartItems();
    return await items[itemIndex].locator('.cart_quantity').textContent();
  }

  async removeItemFromCart(itemIndex) {
    const items = await this.getCartItems();
    if (items.length > itemIndex) {
      await items[itemIndex].locator('button').click();
    } else {
      throw new Error(`Item at index ${itemIndex} not found. Available items: ${items.length}`);
    }
  }

  async clickContinueShopping() {
    await this.page.locator('#continue-shopping').click();
  }

  async clickCheckout() {
    await this.page.locator('#checkout').click();
  }

  async getCartItemCount() {
    const items = await this.getCartItems();
    return items.length;
  }

  async isCartEmpty() {
    const itemCount = await this.getCartItemCount();
    return itemCount === 0;
  }
}

module.exports = { LoginPage, InventoryPage, CartPage };
