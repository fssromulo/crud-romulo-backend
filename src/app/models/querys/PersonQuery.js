module.exports = {
	findPersons: `
		SELECT
			p.id,
			p.name,
			p.password,
			p.email,
			p.permission,
			p.phone
		FROM
			person p
		`,

	findPersonsByName: `
		SELECT
			p.id,
			p.name,
			p.password,
			p.email,
			p.permission,
			p.phone
		FROM
			person p
        WHERE
            p.name LIKE ?
		`,

	findPersonByEmailToAuth: `
		SELECT
			p.id,
			p.name,
			p.password,
			p.email,
			p.permission,
			p.phone
		FROM
			person p
        WHERE
            p.email = ?
		`,

	findPersonsById: `
		SELECT
			p.id,
			p.name,
			p.password,
			p.email,
			p.permission,
			p.phone
		FROM
			person p
        WHERE
            p.id = ?
		`,

	insertPerson: `
		INSERT INTO
			person
		 SET
			?
	`,

	deletePerson: `
        DELETE FROM
			person
		WHERE
			person.id = ?
	`,

	updatePerson: `
        UPDATE
            person
        SET
            $$campos$$
        WHERE
            $$condicoes$$ `,
};
