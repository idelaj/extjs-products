Ext.define('ProductsApp.view.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'ProductsApp.view.products.ProductsGrid'
    ],

    layout: 'border',

    initComponent: function() {
        var me = this;
        me.tabCounter = 1;
        me.callParent();
    },

    items: [
        {
            region: 'north',
            xtype: 'toolbar',
            height: 60,
            cls: 'main-header',
            items: [
                {
                    xtype: 'component',
                    html: '<h1 style="margin: 0; padding: 0 20px; color: white; font-size: 24px; display: inline-block;">Учет товаров</h1>'
                },
                {
                    xtype: 'button',
                    text: 'Товары',
                    cls: 'header-link',
                    style: 'color: white; background: transparent; border: none; text-decoration: none; margin-left: 20px;',
                    handler: function() {
                        var mainPanel = this.up('app-main');
                        if (mainPanel) {
                            mainPanel.openProductsTab();
                        }
                    }
                },                
                {
                    xtype: 'button',
                    text: 'Выйти',
                    cls: 'header-link',
                    style: 'color: white; background: transparent; border: none; text-decoration: none; margin-left: 10px;',
                    handler: function() {
                        var dialog = Ext.create('Ext.window.Window', {
                            title: 'Выход',
                            width: 250,
                            height: 160,
                            modal: true,
                            resizable: false,
                            closable: false,
                            closeAction: 'hide',
                            cls: 'logout-dialog',
                            layout: 'vbox',
                            items: [{
                                xtype: 'component',
                                flex: 1,
                                html: '<div style="text-align: center; font-size: 14px; color: #333; padding: 25px 20px;">Вы уверены, что хотите выйти?</div>'
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                pack: 'center',
                                align: 'center',
                                padding: '0 20px 20px 20px',
                                items: [{
                                    xtype: 'button',
                                    text: 'Да',
                                    cls: 'dialog-button',
                                    margin: '0 5px',
                                    handler: function() {
                                        dialog.close();
                                        var viewport = Ext.ComponentQuery.query('viewport')[0];
                                        viewport.destroy();
                                        Ext.create('Ext.container.Viewport', {
                                            layout: 'center',
                                            items: [{
                                                xtype: 'login'
                                            }]
                                        });
                                    }
                                }, {
                                    xtype: 'button',
                                    text: 'Нет',
                                    cls: 'dialog-button',
                                    margin: '0 5px',
                                    handler: function() {
                                        dialog.close();
                                    }
                                }]
                            }]
                        });
                        dialog.show();
                    }
                }
            ]
        },
        {
            region: 'center',
            xtype: 'tabpanel',
            reference: 'mainTabPanel',
            items: []
        }
    ],

    getProductsData: function() {
        // Return a deep copy of the data to ensure each tab has independent data
        return [
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
        ];
    },

    openProductsTab: function() {
        var me = this;
        var tabPanel = me.down('tabpanel');
    
        if (!tabPanel) {
            Ext.Msg.alert('Ошибка', 'TabPanel не найден!');
            return;
        }
    
        var tabTitle = 'Товары ' + me.tabCounter++;
        
        try {
            var newTab = tabPanel.add({
                title: tabTitle,
                closable: true,
                layout: 'fit',
                items: [{
                    xtype: 'products-grid',
                    tabId: 'tab_' + me.tabCounter
                }]
            });
            tabPanel.setActiveTab(newTab);
        } catch (error) {
            console.error('Error creating tab:', error);
            Ext.Msg.alert('Ошибка', 'Не удалось создать вкладку: ' + error.message);
        }
    }
    
});
