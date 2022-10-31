import { Controller } from '@hotwired/stimulus';
import axios from 'axios';
import { get, map, isNull } from 'lodash-es';

export default class extends Controller {
    HEADERS = {'ACCEPT': 'application/json'};

    buildClassList(classList) {
        if (isNull(classList)) {
            return '';
        }

        return classList.split(' ').join(', ');
    }

    buildItems(items) {
        return map(items, (item) => {
            return {
                'id': get(item, 'id'),
                'title': get(item, 'attributes.title'),
                'class': this.buildClassList(get(item, 'attributes.class_list'))
            }
        });
    }

    buildBoards(boardsData) {
        return map(boardsData['data'], (board) => {
            return {
                'id': get(board, 'id'),
                'title': get(board, 'attributes.title'),
                'class': this.buildClassList(get(board, 'attributes.class_list')),
                'item': this.buildItems(get(board, 'attributes.items.data'))
            }
        });
    }

    buildKanban() {

    }

    connect() {
        axios.get('/api/boards/1/lists', {headers: this.HEADERS}).then((response) => {
            console.log('list response: ', response);

            const boards = this.buildBoards(response['data']);

            console.log('boards: ', boards);

            var kanban = new jKanban({
                element: '#board',                                           // selector of the kanban container
                boards: boards,                                           // json of boards
                itemAddOptions: {
                    enabled: false,                                              // add a button to board for easy item creation
                    content: '+',                                                // text or html content of the board button
                    class: 'kanban-title-button btn btn-default btn-xs',         // default class of the button
                    footer: false                                                // position the button on footer
                },
                itemHandleOptions: {
                    enabled: false,                                 // if board item handle is enabled or not
                    handleClass: "item_handle",                         // css class for your custom item handle
                    customCssHandler: "drag_handler",                        // when customHandler is undefined, jKanban will use this property to set main handler class
                    customCssIconHandler: "drag_handler_icon",                   // when customHandler is undefined, jKanban will use this property to set main icon handler class. If you want, you can use font icon libraries here
                    customHandler: "<span class='item_handle'>+</span> %title% "  // your entirely customized handler. Use %title% to position item title
                                                                                  // any key's value included in item collection can be replaced with %key%
                },
                click: function (el) {
                },                             // callback when any board's item are clicked
                context: function (el, event) {
                },                      // callback when any board's item are right clicked
                dragEl: function (el, source) {
                },                     // callback when any board's item are dragged
                dragendEl: function (el) {
                },                             // callback when any board's item stop drag
                dropEl: function (el, target, source, sibling) {
                },    // callback when any board's item drop in a board
                dragBoard: function (el, source) {
                },                     // callback when any board stop drag
                dragendBoard: function (el) {
                },                             // callback when any board stop drag
                buttonClick: function (el, boardId) {
                },                     // callback when the board's button is clicked
                propagationHandlers: [],                                         // the specified callback does not cancel the browser event. possible values: "click", "context"
            });
        });
    }
}
