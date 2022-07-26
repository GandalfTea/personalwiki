

export enum cell_ui_methods {
	CELL_EDIT,
	CELL_MOVE_UP,
	CELL_MOVE_DOWN,
	CELL_DELETE
};

export enum cell_data_method {
	POST,
	PATCH,
	DELETE
};

export type CellUpdate = {
	method: cell_data_method,
	uuid: string,
	data: string | undefined
};


