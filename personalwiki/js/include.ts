

export enum cell_ui_methods {
	CELL_SELECTED,
	CELL_MOVE_UP,
	CELL_MOVE_DOWN,
};

export enum cell_data_methods {
	POST = 3,
	PATCH = 4,
	DELETE = 5
};

export type CellUpdate = {
	method: cell_data_method,
	uuid: string,
	data: string | undefined
};


