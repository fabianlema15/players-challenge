const app = require('../app')

describe('Players Endpoints', function () {

  describe('GET /', () => {
    context('GET All Players Successful', () => {
      it('Player Successful', () => {
        return supertest(app)
          .get('/api/players')
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an('array')
          })
      })
    })
  })

  describe('GET /page/:page/results/:results', () => {
    context('GET page Players Successful', () => {
      it('Player Successful', () => {
        return supertest(app)
          .get('/api/players/page/1/results/9')
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an('array')
          })
      })
    })
  })

  describe('POST /', () => {
    const requiredFields = ['team', 'jersey_number', 'name', 'position']

    requiredFields.forEach(field => {
      const newPlayer = {
        "team": "Patriots",
        "jersey_number": 11,
        "name": "New Player",
        "position": "QB"
      };

      it(`Responds with 400 required error when '${field}' is missing`, () => {
        delete newPlayer[field]

        return supertest(app)
          .post('/api/players')
          .send(newPlayer)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })

    context('POST Player Successful', () => {

      it('Respons 200 when created', () => {
        const newPlayer = {
          "team": "Patriots",
          "jersey_number": 11,
          "name": "New Player",
          "position": "QB"
        };
        return supertest(app)
          .post('/api/players')
          .send(newPlayer)
          .expect(201)
          .expect(res => {
            expect(res.body).to.be.an('object')
          })
      })
    })
  })

  describe('PATCH /:player_id', () => {
    context('PATCH Player Successful', () => {

      it('Respons 400 when validated', () => {
        const requiredFields = ['team', 'jersey_number', 'name', 'position']

        requiredFields.forEach(field => {
          const newPlayer = {
            "team": "Patriots11",
            "jersey_number": 111,
            "name": "New Player1",
            "position": "QB1"
          };

          it(`Responds with 400 required error when '${field}' is missing`, () => {
            delete newPlayer[field]

            return supertest(app)
              .patch('/api/players/1')
              .send(newPlayer)
              .expect(400, {
                error: `Missing '${field}' in request body`,
              })
          })
        })
      })

        it('Respons 200 when modified', () => {
          const newPlayer = {
            "team": "Patriots11",
            "jersey_number": 111,
            "name": "New Player1",
            "position": "QB1"
          };
          return supertest(app)
            .patch('/api/players/1')
            .send(newPlayer)
            .expect(204)
        })
      })
    })

    describe('DELETE /:player_index', () => {
      context('DELETE Player Successful', () => {

        it('Respons 200 when inactivated', () => {
          return supertest(app)
            .delete('/api/players/1')
            .expect(204)
        })
      })
    })

  })
