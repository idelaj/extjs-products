Ext.define('ProductsApp.view.products.ProductsGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'products-grid',

    layout: 'vbox',
    
    items: [
        {
            xtype: 'panel',
            height: 120,
            bodyPadding: 10,
            title: 'Список товаров',
            cls: 'products-filter-panel',
            layout: 'vbox',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 90,
                        margin: '5 10 5 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ID:',
                            name: 'idFilter',
                            width: 200,
                            enableKeyEvents: true,
                            listeners: {
                                keydown: function(field, e) {
                                    if (e.getKey() === e.ENTER) {
                                        this.up('products-grid').applyFilters();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Описание:',
                            name: 'descriptionFilter',
                            width: 300,
                            emptyText: 'Введите фильтр...',
                            enableKeyEvents: true,
                            listeners: {
                                keydown: function(field, e) {
                                    if (e.getKey() === e.ENTER) {
                                        this.up('products-grid').applyFilters();
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            flex: 1,
            reference: 'productsGrid',
            store: {
                fields: ['id', 'name', 'description', 'price', 'quantity'],
                data: [
                    { id: 1, name: 'Ноутбук Dell', description: 'Игровой ноутбук Dell Inspiron 15', price: 45000.00, quantity: 5 },
                    { id: 2, name: 'Мышь Logitech', description: 'Беспроводная мышь Logitech MX Master', price: 3500.00, quantity: 0 },
                    { id: 3, name: 'Клавиатура Razer', description: 'Механическая клавиатура Razer BlackWidow', price: 8000.00, quantity: 12 },
                    { id: 4, name: 'Монитор Samsung', description: '27-дюймовый монитор Samsung 4K', price: 25000.00, quantity: 3 },
                    { id: 5, name: 'Наушники Sony', description: 'Беспроводные наушники Sony WH-1000XM4', price: 15000.00, quantity: 0 },
                    { id: 6, name: 'Веб-камера Logitech', description: 'Веб-камера Logitech C920 HD Pro', price: 4500.00, quantity: 8 },
                    { id: 7, name: 'Принтер HP', description: 'Лазерный принтер HP LaserJet Pro', price: 12000.00, quantity: 2 },
                    { id: 8, name: 'Планшет iPad', description: 'Планшет Apple iPad Air 10.9', price: 35000.00, quantity: 0 },
                    { id: 9, name: 'Смартфон iPhone', description: 'Смартфон Apple iPhone 13', price: 55000.00, quantity: 15 },
                    { id: 10, name: 'SSD накопитель', description: 'SSD накопитель Samsung 1TB', price: 6000.00, quantity: 20 }
                ]
            },
            columns: [
                {
                    text: 'ID',
                    dataIndex: 'id',
                    width: 80,
                    align: 'center'
                },
                {
                    text: 'Имя',
                    dataIndex: 'name',
                    flex: 1,
                    renderer: function(value, metaData, record) {
                        metaData.style = 'cursor: pointer; text-decoration: underline; color: blue;';
                        return value;
                    },
                    listeners: {
                        click: {
                            element: 'el',
                            delegate: '.x-grid-cell',
                            fn: function(e, t) {
                                var view = this.up('grid').getView();
                                var record = view.getRecord(t);
                                if (record) {
                                    this.showProductCard(record);
                                }
                            }
                        }
                    }
                },
                {
                    text: 'Описание',
                    dataIndex: 'description',
                    flex: 2
                },
                {
                    text: 'Цена',
                    dataIndex: 'price',
                    width: 100,
                    align: 'right',
                    renderer: function(value) {
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {
                    text: 'Кол-во',
                    dataIndex: 'quantity',
                    width: 80,
                    align: 'center',
                    renderer: function(value, metaData) {
                        if (value === 0) {
                            metaData.style = 'background-color: red; color: white;';
                        }
                        return value;
                    }
                }
            ]
        }
    ],

    applyFilters: function() {
        var grid = this.down('grid');
        var store = grid.getStore();
        var idField = this.down('[name=idFilter]');
        var descField = this.down('[name=descriptionFilter]');
        
        store.clearFilter();
        
        if (idField.getValue()) {
            store.addFilter({
                property: 'id',
                value: parseInt(idField.getValue()),
                exactMatch: true
            });
        }
        
        if (descField.getValue()) {
            store.addFilter({
                property: 'description',
                value: descField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
    },

    showProductCard: function(record) {
        Ext.create('Ext.window.Window', {
            title: 'Карточка товара: ' + record.get('name'),
            width: 400,
            height: 300,
            modal: true,
            resizable: false,
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyPadding: 20,
                defaults: {
                    xtype: 'displayfield',
                    labelWidth: 100,
                    anchor: '100%'
                },
                items: [
                    {
                        fieldLabel: 'ID',
                        value: record.get('id')
                    },
                    {
                        fieldLabel: 'Название',
                        value: record.get('name')
                    },
                    {
                        fieldLabel: 'Описание',
                        value: record.get('description')
                    },
                    {
                        fieldLabel: 'Цена',
                        value: Ext.util.Format.number(record.get('price'), '0,000.00') + ' руб.'
                    },
                    {
                        fieldLabel: 'Количество',
                        value: record.get('quantity') + ' шт.'
                    }
                ]
            }],
            buttons: [{
                text: 'Закрыть',
                handler: function() {
                    this.up('window').close();
                }
            }]
        }).show();
    }
});