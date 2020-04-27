
var modelName = 'reading';
var readingSchema = {
	id: {
		type: "INT(6)",
		concentrates: ['UNSIGNED', 'AUTO_INCREMENT', 'PRIMARY KEY']
	},
	level: {
		type: 'INT'
	},
	timestamp: {
		type: 'TIMESTAMP',
		concentrates: ['DEFAULT', 'CURRENT_TIMESTAMP']
	}
};


module.exports = {
	name: modelName,
	schema: readingSchema
};
