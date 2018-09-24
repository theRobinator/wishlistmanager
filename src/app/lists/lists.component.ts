import { Component, OnInit } from '@angular/core';

import {ApiService} from '../api/api.service';
import {AuthService} from '../auth/auth.service';
import {ListItem} from '../models/listitem';
import {WishList} from '../models/wishlist';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styles: []
})
export class ListsComponent implements OnInit {
	private static readonly UPDATE_TIMEOUT = 1000;

	public myItems: ListItem[] = [];
	public otherLists: WishList[] = [];
	public newItem: ListItem;
	public addingItem: boolean = false;
	public loadingItems: {[key: number]: boolean} = {};

	private updateTimeouts: {[key: number]: number} = {};

  	constructor(
  		private apiService: ApiService,
  		private authService: AuthService,
	) {
  		this.resetNewItem();
	}

	public async ngOnInit() {
		const result = await this.apiService.fetchLists();
		const myEmail = this.authService.getCurrentUser().getBasicProfile().getEmail();
		this.newItem['ownerEmail'] = myEmail;

		for (const ownerEmail in result) {
			if (ownerEmail === myEmail) {
				this.myItems = result[ownerEmail]['items'];
			} else {
				this.otherLists.push(result[ownerEmail]);
			}
		}
	}

	public addItem() {
		if (!this.newItem['description']) {
			return;
		}

		this.addingItem = true;
		this.apiService.addToList(this.newItem['description']).then(
			itemFromServer => {
				this.myItems.push(itemFromServer);
				this.resetNewItem();
				this.addingItem = false;
			}, error => {
				this.handleApiError(error);
				this.addingItem = false;
			}
		);
	}

	public updateItem(item: ListItem) {
		if (this.authService.getCurrentUser().getBasicProfile().getEmail() === item['ownerEmail'] && !item['description']) {
			// You aren't allowed to completely delete descriptions
			return;
		}

		// Debounce updates that are sent to the server to minimize network traffic
		if (this.updateTimeouts[item['id']]) {
			clearTimeout(this.updateTimeouts[item['id']]);
		}
		const timer = window.setTimeout(() => {
			this.apiService.updateListItem(item).catch(this.handleApiError.bind(this));
		}, ListsComponent.UPDATE_TIMEOUT);

		this.updateTimeouts[item['id']] = timer;
	}

	public deleteItem(item: ListItem) {
		if (this.updateTimeouts[item['id']]) {
			clearTimeout(this.updateTimeouts[item['id']]);
		}
		this.loadingItems[item['id']] = true;
		this.apiService.deleteFromList(item['id']).then(
			() => {
				for (let i = 0; i < this.myItems.length; ++i) {
					if (this.myItems[i] === item) {
						this.myItems.splice(i, 1);
						break;
					}
				}
				this.loadingItems[item['id']] = false;
			}, error => {
				this.handleApiError(error);
				this.loadingItems[item['id']] = false;
			});
	}

	public markBought(item: ListItem) {
		const name = this.authService.getCurrentUser().getBasicProfile().getName().split(' ')[0];
		item['buyerComments'] = `${name} bought this!`;
		this.updateItem(item);
	}

	private resetNewItem() {
		this.newItem = {
			'id': 0,
			'ownerEmail': '',
			'description': '',
			'buyerComments': '',
		}
	}

	private handleApiError(error: any) {
		console.error(error);
		alert('Something went wrong during saving. Try again, or try refreshing.');
	}

}
