process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

const database = require("../server/database");

chai.use(chaiHttp);

const server = "http://queues-service.herokuapp.com/api";
// const server = "http://localhost:3001/api";

describe("Server", () => {
	it("it must connected to MongoDB", done => {
		database.open(() => done());
	});
	it("it must GET all the queues", done => {
		chai.request(server).get("/queues").end((err, res) => {
			res.should.have.status(200);
			res.should.have.json;
			done();
		});
	});
	it("it mustn't POST queue", done => {
		chai.request(server).post("/queues").end((err, res) => {
			res.should.have.status(400);
			done();
		});
	});
	it("it must POST queue", done => {
		chai.request(server).post("/queues").send({
			title: "test",
			quantityOfPlaces: "99",
			date: "11.11.1111"
		}).end((err, res) => {
			res.should.have.status(200);
			chai.should(res.text === "OK");
			database.getQueues(data => {
				const result = data.filter(item => item.title === "test");
				chai.assert(result.length);
				done();
			});
		});
	});
	it("it must POST place", done => {
		database.getQueues(data => {
			const id = data.filter(item => item.title === "test")[0].id;
			chai.request(server).post("/place").send({
				id,
				place: 1,
				name: "test",
				photo: "test",
				email: "test"
			}).end((err, res) => {
				res.should.have.status(200);
				chai.assert(res.text === "OK");
				database.getQueues(data => {
					const queue = data.filter(item => item.title === "test")[0];
					chai.assert(queue.places.filter(item => item.place === 1).length);
					done();
				});
			});
		});
	});
	it("it mustn't POST place", done => {
		database.getQueues(data => {
			const id = data.filter(item => item.title === "test")[0].id;
			chai.request(server).post("/place").send({
				id,
				place: 2,
				name: "test",
				photo: "test",
				email: "test"
			}).end((err, res) => {
				res.should.have.status(400);
				chai.assert(res.text === "This is not your place.");
				done();
			});
		});
	});
	it("it mustn't POST place", done => {
		database.getQueues(data => {
			const id = data.filter(item => item.title === "test")[0].id;
			chai.request(server).post("/place").send({
				id,
				place: 1,
				name: "test1",
				photo: "test1",
				email: "test1"
			}).end((err, res) => {
				res.should.have.status(400);
				chai.assert(res.text === "Place has been already booked.");
				done();
			});
		});
	});
	it("it must remove place", done => {
		database.getQueues(data => {
			const id = data.filter(item => item.title === "test")[0].id;
			chai.request(server).post("/place").send({
				id,
				place: 1,
				name: "test",
				photo: "test",
				email: "test"
			}).end((err, res) => {
				res.should.have.status(200);
				database.getQueues(data => {
					const queue = data.filter(item => item.title === "test")[0];
					chai.assert(!queue.places.filter(item => item.place === 1).length);
					done();
				});
			});
		});
	});
	it("it must DELETE queue", done => {
		chai.request(server).delete("/queue").send({
			title: "test"
		}).end((err, res) => {
			res.should.have.status(200);
			chai.should(res.text === "OK");
			database.getQueues(data => {
				const result = data.filter(item => item.title === "test");
				chai.should(!result.length);
				done();
			});
		});
	});
	after(done => {
		database.close();
		done();
	});
});