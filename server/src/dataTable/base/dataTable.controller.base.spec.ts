import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { DataTableController } from "../dataTable.controller";
import { DataTableService } from "../dataTable.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  condition1: "exampleCondition1",
  condition2: "exampleCondition2",
  createdAt: new Date(),
  id: "exampleId",
  identifier1: "exampleIdentifier1",
  identifier2: "exampleIdentifier2",
  response1: "exampleResponse1",
  response2: "exampleResponse2",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  condition1: "exampleCondition1",
  condition2: "exampleCondition2",
  createdAt: new Date(),
  id: "exampleId",
  identifier1: "exampleIdentifier1",
  identifier2: "exampleIdentifier2",
  response1: "exampleResponse1",
  response2: "exampleResponse2",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    condition1: "exampleCondition1",
    condition2: "exampleCondition2",
    createdAt: new Date(),
    id: "exampleId",
    identifier1: "exampleIdentifier1",
    identifier2: "exampleIdentifier2",
    response1: "exampleResponse1",
    response2: "exampleResponse2",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  condition1: "exampleCondition1",
  condition2: "exampleCondition2",
  createdAt: new Date(),
  id: "exampleId",
  identifier1: "exampleIdentifier1",
  identifier2: "exampleIdentifier2",
  response1: "exampleResponse1",
  response2: "exampleResponse2",
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("DataTable", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: DataTableService,
          useValue: service,
        },
      ],
      controllers: [DataTableController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /data-tables", async () => {
    await request(app.getHttpServer())
      .post("/data-tables")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /data-tables", async () => {
    await request(app.getHttpServer())
      .get("/data-tables")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /data-tables/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/data-tables"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /data-tables/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/data-tables"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
