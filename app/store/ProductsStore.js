Ext.define('ProductsApp.store.ProductsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.products-store',
    
    model: 'ProductsApp.model.Product',
    
    data: [
        { id: 1, name: 'Notebook Lenovo', description: 'Ноутбук ThinkPad T460 14"FH...', price: 100.00, quantity: 2 },
        { id: 2, name: 'Keyboard OKLICK', description: 'Клавиатура OKLICK 140M, US...', price: 50.00, quantity: 8 },
        { id: 3, name: 'Network adapter', description: 'Сетевой адаптер WiFi D-Link ...', price: 7.00, quantity: 0 },
        { id: 4, name: 'Ноутбук Dell', description: 'Игровой ноутбук Dell Inspiron 15', price: 45000.00, quantity: 5 },
        { id: 5, name: 'Мышь Logitech', description: 'Беспроводная мышь Logitech MX Master', price: 3500.00, quantity: 0 },
        { id: 6, name: 'Клавиатура Razer', description: 'Механическая клавиатура Razer BlackWidow', price: 8000.00, quantity: 12 },
        { id: 7, name: 'Монитор Samsung', description: '27-дюймовый монитор Samsung 4K', price: 25000.00, quantity: 3 },
        { id: 8, name: 'Наушники Sony', description: 'Беспроводные наушники Sony WH-1000XM4', price: 15000.00, quantity: 0 },
        { id: 9, name: 'Веб-камера Logitech', description: 'Веб-камера Logitech C920 HD Pro', price: 4500.00, quantity: 8 },
        { id: 10, name: 'Принтер HP', description: 'Лазерный принтер HP LaserJet Pro', price: 12000.00, quantity: 2 },
        { id: 11, name: 'Планшет iPad', description: 'Планшет Apple iPad Air 10.9', price: 35000.00, quantity: 0 },
        { id: 12, name: 'Смартфон iPhone', description: 'Смартфон Apple iPhone 13', price: 55000.00, quantity: 15 }
    ]
});