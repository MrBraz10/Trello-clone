import {Controller} from '@hotwired/stimulus';
import axios from 'axios';
import {get, map, sample} from 'lodash-es';

export default class extends Controller {
    HEADERS = {'ACCEPT': 'application/json'};
    BACKGROUND_COLORS = ['bg-green-700', 'bg-blue-700', 'bg-red-700', 'bg-slate-700', 'bg-yellow-700']

    getHeaderTitles() {
    return Array.from(document.getElementsByClassName('kanban-title-board'));
    }

    cursorifyHeaderTitles() {
        this.getHeaderTitles().forEach((headerTitle) => {
            headerTitle.classList.add('cursor-pointer');
        });
    }

    addLinkToHeaderTitles(boards) {
        this.getHeaderTitles().forEach((headerTitle, index) => {
            headerTitle.addEventListener('click', () => {
                Turbo.visit(`${this.element.dataset.boardListsUrl}/${boards[index].id}/edit`);
            });
        });
    }

    connect() {
        axios.get(this.element.dataset.apiUrl, {headers: this.HEADERS}).then((response) => {
            this.buildKanban(this.buildBoards(response['data']));
            this.cursorifyHeaderTitles();
            this.addLinkToHeaderTitles(this.buildBoards(response['data']));
        });
    }

    buildClassList() {
        return `text-white, ${sample(this.BACKGROUND_COLORS)}`;
    }

    buildItems(items) {
        return map(items, (item) => {
            return {
                'id': get(item, 'id'),
                'title': get(item, 'attributes.title'),
                'class': this.buildClassList()
            }
        });
    }

    buildBoards(boardsData) {
        return map(boardsData['data'], (board) => {
            return {
                'id': get(board, 'id'),
                'title': get(board, 'attributes.title'),
                'class': this.buildClassList(),
                'item': this.buildItems(get(board, 'attributes.items.data'))
            }
        });
    }

    buildKanban(boards) {
        new jKanban({
            element: `#${this.element.id}`,                                           // selector of the kanban container
            boards: boards,                                           // json of boards
            itemAddOptions: {
                enabled: true
            },
            buttonClick: () => {
                console.log('board click');
            }
        });
    }
}
