Ext.define('ProductsApp.view.products.ProductsGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'products-grid',

    layout: 'absolute',
    height: '100%',
    width: '100%',
    cls: 'products-grid',
    
    initComponent: function() {
        console.log('ProductsGrid initComponent called');
        this.callParent(arguments);
        console.log('ProductsGrid after callParent');
    },
    
    listeners: {
        afterrender: function(panel) {
            console.log('ProductsGrid afterrender called');
            console.log('ProductsGrid DOM element:', panel.el);
            console.log('ProductsGrid items count:', panel.items.length);
            console.log('ProductsGrid visible:', panel.isVisible());
            console.log('ProductsGrid height:', panel.getHeight());
            
            // Check each item
            panel.items.each(function(item, index) {
                console.log('Item ' + index + ':', item.xtype, 'visible:', item.isVisible(), 'height:', item.getHeight());
            });
        }
    },
    
    items: [
        {
            xtype: 'panel',
            x: 10,
            y: 10,
            width: 'calc(100% - 20px)',
            height: 120,
            bodyPadding: 10,
            title: 'Фильтры',
            cls: 'products-filter-panel',
            layout: 'vbox',
            listeners: {
                afterrender: function(panel) {
                    console.log('Filter panel afterrender called');
                    console.log('Filter panel items count:', panel.items.length);
                }
            },
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
                            emptyText: 'Введите фильтр...',
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
            x: 10,
            y: 140,
            width: 'calc(100% - 20px)',
            height: 250,
            reference: 'productsGrid',
            store: {
                fields: ['id', 'name', 'description', 'price', 'quantity'],
                data: [
                    { id: 1, name: 'Notebook Lenovo', description: 'Ноутбук ThinkPad T460 14"FH...', price: 100.00, quantity: 2 },
                    { id: 2, name: 'Keyboard OKLICK', description: 'Клавиатура OKLICK 140M, US...', price: 50.00, quantity: 8 },
                    { id: 3, name: 'Network adapter', description: 'Сетевой адаптер WiFi D-Link ...', price: 7.00, quantity: 0 }
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
                                var grid = this.up('grid');
                                var view = grid.getView();
                                var record = view.getRecord(t);
                                if (record) {
                                    this.up('products-grid').showProductCard(record);
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
                    align: 'right'
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
                        value: record.get('price') + ' руб.'
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