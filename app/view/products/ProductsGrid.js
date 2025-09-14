Ext.define('ProductsApp.view.products.ProductsGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'products-grid',

    layout: 'absolute',
    height: '100%',
    width: '100%',
    cls: 'products-grid',
    
    initComponent: function() {
        this.callParent(arguments);
    },
    
    listeners: {
        afterrender: function(panel) {
        }
    },
    
    items: [
        {
            xtype: 'panel',
            x: 10,
            y: 10,
            width: 'calc(100% - 20px)',
            height: 150,
            bodyPadding: 10,
            title: 'Фильтры',
            cls: 'products-filter-panel',
            layout: 'vbox',
            listeners: {
                afterrender: function(panel) {
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID:',
                    name: 'idFilter',
                    width: 400,
                    emptyText: 'Введите ID товара...',
                    enableKeyEvents: true,
                    margin: '5 0',
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
                    width: 400,
                    emptyText: 'Введите описание товара...',
                    enableKeyEvents: true,
                    margin: '5 0',
                    listeners: {
                        keydown: function(field, e) {
                            if (e.getKey() === e.ENTER) {
                                this.up('products-grid').applyFilters();
                            }
                        }
                    }
                }
            ]
        },
        {
            xtype: 'grid',
            x: 10,
            y: 170,
            width: 'calc(100% - 20px)',
            height: 200,
            reference: 'productsGrid',
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                displayMsg: 'Показано {0} - {1} из {2}',
                emptyMsg: 'Нет данных для отображения',
                store: null
            }],
            listeners: {
                afterrender: function(grid) {
                    var pagingToolbar = grid.down('pagingtoolbar');
                    var store = grid.getStore();
                    
                    if (pagingToolbar && store) {
                        pagingToolbar.bindStore(store);
                        store.loadPage(1);
                    }
                },
                cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
                    if (cellIndex === 1) {
                        this.up('products-grid').showProductCard(record);
                    }
                }
            },
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'name', 'description', 'price', 'quantity'],
                pageSize: 5,
                autoLoad: true,
                proxy: {
                    type: 'memory',
                    data: [
                        { id: 1, name: 'Notebook Lenovo', description: 'Ноутбук Lenovo ThinkPad T460, 14-дюймовый экран Full HD, процессор Intel Core i5, 8 ГБ оперативной памяти, SSD 256 ГБ, Windows 10 Pro.', price: 100.00, quantity: 2 },
                        { id: 2, name: 'Keyboard OKLICK', description: 'Клавиатура OKLICK 140M, классическая мембранная с полноразмерной раскладкой, интерфейс USB, английская и русская раскладка.', price: 50.00, quantity: 8 },
                        { id: 3, name: 'Network adapter', description: 'Сетевой адаптер WiFi D-Link DWA-131, стандарты IEEE 802.11n/g/b, частота 2.4 ГГц, скорость до 300 Мбит/с, компактный форм-фактор USB.', price: 7.00, quantity: 0 },
                        { id: 4, name: 'Ноутбук Dell', description: 'Игровой ноутбук Dell Inspiron 15, экран 15.6 дюймов Full HD, процессор Intel Core i7, видеокарта NVIDIA GeForce GTX 1650, 16 ГБ RAM, SSD 512 ГБ.', price: 45000.00, quantity: 5 },
                        { id: 5, name: 'Мышь Logitech', description: 'Беспроводная мышь Logitech MX Master с сенсором высокой точности, эргономичным дизайном и возможностью работы по Bluetooth и через USB-ресивер.', price: 3500.00, quantity: 0 },
                        { id: 6, name: 'Клавиатура Razer', description: 'Механическая клавиатура Razer BlackWidow с подсветкой Chroma RGB, переключатели Razer Green, программируемые макросы, игровой режим.', price: 8000.00, quantity: 12 },
                        { id: 7, name: 'Монитор Samsung', description: '27-дюймовый монитор Samsung с разрешением 4K UHD (3840x2160), матрица IPS, поддержка HDR10, частота обновления 60 Гц, интерфейсы HDMI и DisplayPort.', price: 25000.00, quantity: 3 },
                        { id: 8, name: 'Наушники Sony', description: 'Беспроводные наушники Sony WH-1000XM4 с активным шумоподавлением, Bluetooth 5.0, поддержкой LDAC, временем работы до 30 часов и быстрой зарядкой.', price: 15000.00, quantity: 0 },
                        { id: 9, name: 'Веб-камера Logitech', description: 'Веб-камера Logitech C920 HD Pro, запись в формате Full HD 1080p, автофокус, стереомикрофоны, поддержка Skype и Zoom, крепление на монитор или штатив.', price: 4500.00, quantity: 8 },
                        { id: 10, name: 'Принтер HP', description: 'Лазерный принтер HP LaserJet Pro M404dn, скорость печати до 38 стр/мин, автоподача бумаги, поддержка двусторонней печати, интерфейсы USB и Ethernet.', price: 12000.00, quantity: 2 },
                        { id: 11, name: 'Планшет iPad', description: 'Планшет Apple iPad Air 10.9, процессор Apple M1, 64 ГБ встроенной памяти, дисплей Liquid Retina с поддержкой Apple Pencil и Magic Keyboard.', price: 35000.00, quantity: 0 },
                        { id: 12, name: 'Смартфон iPhone', description: 'Смартфон Apple iPhone 13 с 6.1-дюймовым OLED-дисплеем Super Retina XDR, процессором A15 Bionic, двойной камерой 12 Мп и поддержкой 5G.', price: 55000.00, quantity: 15 }
                    ],
                    enablePaging: true
                }
            }),
            columns: [
                {
                    text: 'ID',
                    dataIndex: 'id',
                    width: '20%',
                    align: 'center'
                },
                {
                    text: 'Имя',
                    dataIndex: 'name',
                    width: '20%',
                    renderer: function(value, metaData, record) {
                        metaData.style = 'cursor: pointer; text-decoration: underline; color: blue;';
                        return value;
                    }
                },
                {
                    text: 'Описание',
                    dataIndex: 'description',
                    width: '20%',
                    renderer: function(value) {
                        if (value && value.length > 30) {
                            return value.substring(0, 30) + '...';
                        }
                        return value;
                    }
                },
                {
                    text: 'Цена',
                    dataIndex: 'price',
                    width: '20%',
                    align: 'right'
                },
                {
                    text: 'Кол-во',
                    dataIndex: 'quantity',
                    width: '20%',
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
        var me = this;
        var originalData = {
            price: record.get('price'),
            quantity: record.get('quantity')
        };
        
        var productCard = Ext.create('Ext.window.Window', {
            title: 'Карточка товара: ' + record.get('name'),
            width: 450,
            height: 400,
            modal: true,
            resizable: false,
            closable: false,
            cls: 'product-card-dialog',
            layout: 'fit',
            items: [{
                xtype: 'form',
                reference: 'productForm',
                bodyPadding: 20,
                defaults: {
                    labelWidth: 120,
                    anchor: '100%',
                    msgTarget: 'side'
                },
                items: [
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'ID',
                        value: record.get('id'),
                        cls: 'product-card-field'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Наименование',
                        value: record.get('name'),
                        cls: 'product-card-field'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Описание',
                        value: record.get('description'),
                        cls: 'product-card-field'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'price',
                        fieldLabel: 'Цена',
                        value: record.get('price'),
                        minValue: 0,
                        allowDecimals: true,
                        decimalPrecision: 2,
                        allowBlank: false,
                        emptyText: 'Введите цену...',
                        cls: 'product-card-field editable-field',
                        listeners: {
                            change: function(field, newValue) {
                                me.checkForChanges(productCard, originalData);
                            }
                        }
                    },
                    {
                        xtype: 'numberfield',
                        name: 'quantity',
                        fieldLabel: 'Кол-во',
                        value: record.get('quantity'),
                        minValue: 0,
                        allowDecimals: false,
                        allowBlank: false,
                        emptyText: 'Введите количество...',
                        cls: 'product-card-field editable-field',
                        listeners: {
                            change: function(field, newValue) {
                                me.checkForChanges(productCard, originalData);
                            }
                        }
                    }
                ]
            }],
            buttons: [
                {
                    text: 'Отмена',
                    cls: 'product-card-button cancel-button',
                    handler: function() {
                        productCard.close();
                    }
                },
                {
                    text: 'Сохранить',
                    cls: 'product-card-button save-button',
                    formBind: true,
                    handler: function() {
                        me.saveProductChanges(productCard, record, originalData);
                    }
                }
            ]
        });
        
        productCard.originalData = originalData;
        productCard.record = record;
        productCard.show();
    },

    checkForChanges: function(productCard, originalData) {
        var form = productCard.down('form');
        var currentPrice = parseFloat(form.getForm().getFieldValues().price) || 0;
        var currentQuantity = parseInt(form.getForm().getFieldValues().quantity) || 0;
        
        var hasChanges = (currentPrice !== originalData.price) || (currentQuantity !== originalData.quantity);
        
        var saveButton = productCard.down('button[text=Сохранить]');
        if (saveButton) {
            saveButton.setDisabled(!hasChanges);
        }
    },

    saveProductChanges: function(productCard, record, originalData) {
        var form = productCard.down('form');
        var formValues = form.getForm().getFieldValues();

        var hasChanges = (parseFloat(formValues.price) !== originalData.price) || 
                        (parseInt(formValues.quantity) !== originalData.quantity);
        
        if (hasChanges) {
            Ext.Msg.show({
                title: 'Сохранение изменений',
                msg: 'Обнаружены изменения в данных товара. Сохранить изменения?',
                buttons: Ext.Msg.YESNO,
                buttonText: {
                    yes: 'Да',
                    no: 'Нет'
                },
                fn: function(btn) {
                    if (btn === 'yes') {    
                        record.set('price', parseFloat(formValues.price));
                        record.set('quantity', parseInt(formValues.quantity));
                        
                        record.commit();
                        
                        Ext.Msg.alert('Успех', 'Данные товара успешно сохранены!');
                        
                        productCard.close();
                    }
                }
            });
        } else {
            Ext.Msg.alert('Информация', 'Изменений не обнаружено.');
        }
    }
});