/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @category   Pimcore
 * @package    Object
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

pimcore.registerNS("pimcore.object.gridcolumn.operator.text");

pimcore.object.gridcolumn.operator.text = Class.create(pimcore.object.gridcolumn.Abstract, {
    operatorGroup: "formatter",
    type: "operator",
    class: "Text",
    iconCls: "pimcore_icon_operator_text",
    defaultText: "Text",
    group: "string",


    getConfigTreeNode: function(configAttributes) {
        if(configAttributes) {
            var node = {
                draggable: true,
                iconCls: this.iconCls,
                text: configAttributes.textValue,
                configAttributes: configAttributes,
                isTarget: true,
                leaf: true
            };
        } else {

            //For building up operator list
            var configAttributes = { type: this.type, class: this.class};

            var node = {
                draggable: true,
                iconCls: this.iconCls,
                text: this.getDefaultText(),
                configAttributes: configAttributes,
                isTarget: true,
                leaf: true
            };
        }
        node.isOperator = true;
        return node;
    },


    getCopyNode: function(source) {
        var copy = source.createNode({
            iconCls: this.iconCls,
            text: source.data.text,
            isTarget: true,
            leaf: true,
            isOperator: true,
            configAttributes: {
                label: null,
                type: this.type,
                class: this.class
            }
        });

        return copy;
    },


    getConfigDialog: function(node) {
        this.node = node;

        this.textField = new Ext.form.TextField({
            fieldLabel: t('text'),
            length: 255,
            width: 200,
            value: this.node.data.configAttributes.textValue
        });

        this.configPanel = new Ext.Panel({
            layout: "form",
            bodyStyle: "padding: 10px;",
            items: [this.textField],
            buttons: [{
                text: t("apply"),
                iconCls: "pimcore_icon_apply",
                handler: function () {
                    this.commitData();
                }.bind(this)
            }]
        });

        this.window = new Ext.Window({
            width: 400,
            height: 160,
            modal: true,
            title: this.getDefaultText(),
            layout: "fit",
            items: [this.configPanel]
        });

        this.window.show();
        return this.window;
    },

    commitData: function() {
        this.node.data.configAttributes.textValue = this.textField.getValue();
        this.node.data.configAttributes.label = this.textField.getValue();
        this.node.set('text', this.textField.getValue());
        this.node.set('isOperator', true);
        this.window.close();
    }
});