require('dotenv').config()
const { CONNECTION_STRING } = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists jobs;
            drop table if exists states;

            create table states (
                state_id serial primary key,
                state_name varchar NOT NULL
            );

            create table jobs (
                job_id serial primary key,
                title varchar NOT NULL,
                location varchar NOT NULL,
                salary integer NOT NULL,
                description varchar NOT NULL,
                stateId integer NOT NULL REFERENCES states(state_id)
            );

            insert into states (state_name)
            values ('AL'),
            ('AK'),
            ('AZ'),
            ('AR'),
            ('CA'),
            ('CO'),
            ('CT'),
            ('DE'),
            ('FL'),
            ('GA'),
            ('HI'),
            ('ID'),
            ('IL'),
            ('IN'),
            ('IA'),
            ('KS'),
            ('KY'),
            ('LA'),
            ('ME'),
            ('MD'),
            ('MA'),
            ('MI'),
            ('MN'),
            ('MS'),
            ('MO'),
            ('MT'),
            ('NE'),
            ('NV'),
            ('NH'),
            ('NJ'),
            ('NM'),
            ('NY'),
            ('NC'),
            ('ND'),
            ('OH'),
            ('OK'),
            ('OR'),
            ('PA'),
            ('RI'),
            ('SC'),
            ('SD'),
            ('TN'),
            ('TX'),
            ('UT'),
            ('VT'),
            ('VA'),
            ('WA'),
            ('WV'),
            ('WI'),
            ('WY');

            INSERT INTO jobs (title, location, salary, description, stateId)
            values ('Looking for 2 kitchen helpers at Green Restaurant', 'Test City', 40000, 'We are looking for 2 kitchen helpers', 1),
            ('Sales Representative Positions at XYZ', 'Hello City', '65000', 'Please contact test@test.com if you are interested', 2),
            ('IT Developer at HelloWorld', 'New Town', '100000', 'Required skillset: Javascript, Node JS, React', 3);

        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getStates: (req, res) => {

        const query = `SELECT * FROM states;`

        sequelize.query(query)
            .then(dbRes => {
                console.log(dbRes[0]);
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.log(err);
            })
    },

    createJob: (req, res) => {

        const { title, location, salary, description, stateId } = req.body;

        const query = `
            INSERT INTO jobs (title, location, salary, description, stateId)
            VALUES ('${title}', '${location}', ${salary}, '${description}', ${stateId});
        `
        sequelize.query(query)
            .then(dbRes => {
                console.log(dbRes[0]);
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.log(err);
            })
    },

    getJobs: (req, res) => {

        const query = `
        SELECT job_id, title, location, salary, description, state_id, state_name as state
        FROM jobs
        JOIN states
        ON jobs.stateId = states.state_id;
        `

        sequelize.query(query)
            .then(dbRes => {
                console.log(dbRes[0]);
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.log(err);
            })


    },

    deleteJob: (req, res) => {
        const { id } = req.params;
        const query = `
        DELETE FROM jobs
        WHERE jobs.job_id = ${id}
        `
        sequelize.query(query)
            .then(dbRes => {
                console.log(dbRes[0]);
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.log(err);
            })
    },

    updateJob: (req, res) => {
        const { title, location, salary, description } = req.body;
        const { id } = req.params;
        const query = `
        UPDATE jobs 
        SET title = '${title}', location = '${location}', salary = ${salary}, description= '${description}' 
        WHERE jobs.job_id = ${id}
        `
        sequelize.query(query)
            .then(dbRes => {
                console.log(dbRes[0]);
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.log(err);
            })
    },

    getSalaryJobs: (req, res) => {

        const query = `
        SELECT job_id, title, location, salary, description, state_id, state_name as state
        FROM jobs
        JOIN states
        ON jobs.stateId = states.state_id
        ORDER BY salary DESC;`

        sequelize.query(query)
            .then(dbRes => {
                console.log(dbRes[0]);
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.log(err);
            })

    },

    getRandomJobNews: (req, res) => {

        const news = [
            'US employers added surprisingly robust 353,000 jobs in January in further sign of economic strength. (Mar-2024)',
            'US employers added a solid 199,000 jobs in November in sign of a still-sturdy labor market. (Mar-2024)',
            'U.S. employers added a surprisingly strong 336,000 jobs in September in a sign of economic resilience. (Oct-2023)',
            'Top executives say they are training workers on AI. Managers, employees disagree. (Mar-2024)',
            'Leaders are looking to connect with workers in the wrong way, Columbia prof says. (Feb-2024)',
            'Ghosting gets more common in the job market: It is not a passing fad. (Feb-2024)',
            '4-day working week proves successful after the biggest trial in Europe. (Feb-2024)',
            'A majority of American business owners support minimum wage increases. (Feb-2024)',
            'Workers without degrees are not getting as many good job offers as it seems. (Feb-2024)'
        ]

        let randomIndex = Math.floor(Math.random() * news.length);
        let randomNews = news[randomIndex];

        res.status(200).send(randomNews);
    }
}