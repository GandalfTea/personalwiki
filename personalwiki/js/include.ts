
enum cell_ui_methods {
	CELL_TEXT_EDIT,
	CELL_MOVE_UP,
	CELL_MOVE_DOWN,
	CELL_DELETE
};

enum cell_data_method {
	POST,
	PATCH,
	DELETE
};

type CellUpdate = {
	method: cell_data_method,
	data: string | undefined,
}


