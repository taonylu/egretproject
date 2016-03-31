package com.pixeltoyfactory.rube
{
    import flash.net.URLRequest;
    import flash.events.Event;
    import flash.events.IOErrorEvent;


    import Box2D.Dynamics.b2BodyDef;
    import Box2D.Dynamics.b2Body;
    import Box2D.Dynamics.b2ContactListener;
    import Box2D.Dynamics.b2DebugDraw;
    import Box2D.Dynamics.b2Fixture;
    import Box2D.Dynamics.b2FixtureDef;
    import Box2D.Dynamics.b2FilterData;
    import Box2D.Dynamics.Joints.b2Joint;
    import Box2D.Dynamics.Joints.b2DistanceJointDef;
    import Box2D.Dynamics.Joints.b2FrictionJointDef;
    import Box2D.Dynamics.Joints.b2LineJointDef;
    import Box2D.Dynamics.Joints.b2JointDef;
    import Box2D.Dynamics.Joints.b2PrismaticJointDef;
    import Box2D.Dynamics.Joints.b2RevoluteJointDef;
    import Box2D.Dynamics.Joints.b2WeldJointDef;
    import Box2D.Dynamics.b2World;
    import Box2D.Collision.Shapes.b2Shape;
    import Box2D.Collision.Shapes.b2CircleShape;
    import Box2D.Collision.Shapes.b2PolygonShape;
    import Box2D.Common.Math.b2Vec2;

    public class RubeLoader
    {
        //Revolute --------------------
        public static var REVOLUTE_PROPS_TO_COPY:Vector.<String> = new <String>[
                "maxMotorTorque",
                "motorSpeed",
                "enableLimit",
                "enableMotor"
        ];

        public static var REVOLUTE_PROPS_TO_MAP:Array = [
            {from: "refAngle", to: "referenceAngle"},
            {from: "lowerLimit", to: "lowerAngle"},
            {from: "upperLimit", to: "upperAngle"}
        ];

        //Distance -------------------
        public static var DISTANCE_PROPS_TO_COPY:Vector.<String> = new <String>[
                "length",
                "dampingRatio",
        ];

        public static var DISTANCE_PROPS_TO_MAP:Array = [
            {from: "frequency", to: "frequencyHz"}
        ];

        //Prismatic
        public static var PRISMATIC_PROPS_TO_COPY:Vector.<String> = new <String>[
                "enableLimit",
                "enableMotor",
                "maxMotorForce",
                "motorSpeed"
        ];

        public static var PRISMATIC_PROPS_TO_MAP:Array = [
            {from: "refAngle", to: "referenceAngle"},
            {from: "lowerLimit", to: "lowerTranslation"},
            {from: "upperLimit", to: "upperTranslation"},
        ];

        public static var FIXTURE_PROPS_TO_COPY:Vector.<String> = new <String>[
                "friction",
                "density",
                "restitution",
        ];

        public static var FIXTURE_PROPS_TO_MAP:Array = [
            {from: "sensor", to: "isSensor"}
        ];

        public static var FILTER_PROPS_TO_MAP:Array = [
            {from: "filter-categoryBits", to: "categoryBits"},
            {from: "filter-maskBits", to: "maskBits"},
            {from: "filter-groupIndex", to: "groupIndex"},
        ];

        public var positionOffset:b2Vec2;

        public var rubeImages:Array = [];
        public var world:b2World;

        public function RubeLoader()
        {
        }

        public function loadWorldFromRube(worldData:Object):b2World
        {
            world = new b2World(vec2FromObject(worldData.gravity), true);
            return world;
        }

        //TODO remove
        public function getNamedBodies(world:b2World, name:String):Vector.<b2Body>
        {
            var bodiesWithName:Vector.<b2Body> = new Vector.<b2Body>();

            var head:b2Body = world.GetBodyList();
            do {
                var userData:Object = Object(head.GetUserData());
                if (userData.name !== undefined && userData.name === name) {
                    bodiesWithName.push(head);
                }
            } while ((head = head.GetNext()) != null)

            return bodiesWithName;
        }

        public function getNamedJoints(world:b2World, name:String):Vector.<b2Joint>
        {
            var jointsWithName:Vector.<b2Joint> = new Vector.<b2Joint>();

            var head:b2Joint = world.GetJointList();
            do {
                var userData:Object = Object(head.GetUserData());
                if (userData.name !== undefined && userData.name === name) {
                    jointsWithName.push(head);
                }
            } while ((head = head.GetNext()) != null)

            return jointsWithName;
        }

        public function loadSceneIntoWorld(worldData:Object, world:b2World, offset:b2Vec2=null):void
        {
            if (offset === null) {
                offset = new b2Vec2();
            }

            positionOffset = offset;

            var loadedBodies:Vector.<b2Body> = new Vector.<b2Body>();

            var bodiesData:Array = worldData.body;
            for each(var bodyData:Object in bodiesData) {
                loadedBodies.push(
                    loadBodyFromRube(bodyData, world)
                );
            }


            var loadedJoints:Vector.<b2Joint> = new Vector.<b2Joint>();

            var jointsData:Array = worldData.joint;
            for each(var jointData:Object in jointsData) {
                loadJointFromRube(jointData, loadedBodies, world);
            }

            var imagesData:Array = worldData.image;
            for each(var imageData:Object in imagesData) {
                loadImageFromRube(imageData, loadedBodies, world)
            }

        }

        public function loadImageFromRube(imageData:Object, loadedBodies:Vector.<b2Body>, world:b2World):Object {


            if (imageData.body >= 0) {
                imageData.body = loadedBodies[imageData.body];
            } else {
                imageData.body = null;
            }

            imageData.center = vec2FromObject(imageData.center);
            rubeImages.push(imageData);

            return imageData;
        }

        public function loadBodyFromRube(bodyData:Object, world:b2World):b2Body
        {
            var bodyDef:b2BodyDef = new b2BodyDef();
            b2Body.b2_dynamicBody = 2;
            b2Body.b2_kinematicBody = 1;
            b2Body.b2_staticBody = 0;

            //Type
            if (bodyData.type === b2Body.b2_dynamicBody) {
                bodyDef.type = b2Body.b2_dynamicBody;
            } else if (bodyData.type === b2Body.b2_kinematicBody) {
                bodyDef.type = b2Body.b2_kinematicBody;
            } else if (bodyData.type === b2Body.b2_staticBody) {
                bodyDef.type = b2Body.b2_staticBody;
            } else {
                throw new Error("unknown body type");
            }

            bodyDef.angle = bodyData.angle

            bodyDef.angularVelocity = bodyData.angularVelocity;

            //Do I need both of these?
            //bodyDef.active = bodyData.active;
            //bodyDef.awake = bodyData.awake;

            //fixedRotation
            bodyDef.fixedRotation = bodyData.fixedRotation;

            //linearVelocity
            if (bodyData.linearVelocity !== 0) {
                bodyDef.linearVelocity = vec2FromObject(bodyData.linearVelocity);
            }

            //Find Position
            // retrieving body position as i-th body->position->x and i-th body->position->y
            //Correct if position is 0,0 in the data is is just and int = 0;
            var position:b2Vec2 = vec2FromObject(bodyData.position);

            var positionX:Number = position.x + positionOffset.x;
            var positionY:Number = position.y + positionOffset.y;

            bodyDef.position.Set(positionX, positionY);

            var body:b2Body = world.CreateBody(bodyDef);

            var userData:Object = {};
            userData.name = bodyData.name;
            userData.customProperties = bodyData.customProperties;
            body.SetUserData(userData);

            if (bodyData.fixture !== undefined) {
                var fixturesData:Array = bodyData.fixture;
                for each(var fixtureData:Object in fixturesData) {
                    loadFixtureFromRube(body, fixtureData);
                }
            }

            return body;
        }

        public function loadFixtureFromRube(body:b2Body, fixtureData:Object):void
        {
            var fixtureDef:b2FixtureDef = new b2FixtureDef();

            var filterData:b2FilterData = new b2FilterData();
            var filterCopier:PropertyCopier = new PropertyCopier(fixtureData, filterData);
            filterCopier.mapMultiple(FILTER_PROPS_TO_MAP);

            fixtureDef.filter = filterData;

            var copier:PropertyCopier = new PropertyCopier(fixtureData, fixtureDef);

            copier.copyMultiple(FIXTURE_PROPS_TO_COPY);
            copier.mapMultiple(FIXTURE_PROPS_TO_MAP);


            if (fixtureData.circle !== undefined) {
                createCircleShape(fixtureData, fixtureDef, body);
            } else if (fixtureData.polygon !== undefined) {
                createPolygonShape(fixtureData, fixtureDef, body);
            } else if (fixtureData.chain !== undefined) {
                createChainShape(fixtureData, fixtureDef, body);
            } else {
                throw new Error("Unknown fixture type");
            }
        }

        public function createCircleShape(fixtureData:Object, fixtureDef:b2FixtureDef, body:b2Body):void
        {
            var circleData:Object = fixtureData.circle;
            var circleShape:b2CircleShape = new b2CircleShape();
            circleShape.SetRadius(circleData.radius);

            if (circleData.center !== undefined) {
                circleShape.SetLocalPosition(
                        vec2FromObject(circleData.center)
                    );
            }

            fixtureDef.shape = circleShape;
            var fixture:b2Fixture = body.CreateFixture(fixtureDef);
        }

        public function createPolygonShape(fixtureData:Object, fixtureDef:b2FixtureDef, body:b2Body):void
        {
            var polygonData:Object = fixtureData.polygon;
            var polygonShape:b2PolygonShape = new b2PolygonShape();

            var verticesX:Array = polygonData.vertices.x;
            var verticesY:Array = polygonData.vertices.y;

            var points:Vector.<b2Vec2> = new Vector.<b2Vec2>();

            for (var i:Number = 0; i < verticesX.length; i++) {
                var vec:b2Vec2 = new b2Vec2(verticesX[i], verticesY[i]);
                points.push(vec);
            }

            polygonShape.SetAsVector(points, i);

            fixtureDef.shape = polygonShape;
            var fixture:b2Fixture = body.CreateFixture(fixtureDef);
        }

        public function createChainShape(fixtureData:Object, fixtureDef:b2FixtureDef, body:b2Body):void
        {
            var chainData:Object = fixtureData.chain;
            var polygonShape:b2PolygonShape = new b2PolygonShape();
            var lastVertex:b2Vec2 = new b2Vec2();

            var verticesX:Array = chainData.vertices.x;
            var verticesY:Array = chainData.vertices.y;

            for (var i:Number = 0; i < verticesX.length; i++) {
                var thisVertex:b2Vec2 = new b2Vec2(verticesX[i], verticesY[i]);
                if (i > 0) {
                    polygonShape.SetAsEdge(lastVertex, thisVertex);

                    fixtureDef.shape = polygonShape;
                    var fixture:b2Fixture = body.CreateFixture(fixtureDef);
                }

                lastVertex = thisVertex;
            }
        }

        public function loadJointFromRube(jointData:Object, loadedBodies:Vector.<b2Body>, world:b2World):void {

            if (jointData.type === undefined) {
                throw new Error("joint does not have a type");
            }

            if (jointData.bodyA === undefined) {
                throw new Error("joint does not have bodyA");
            }

            if (jointData.bodyB === undefined) {
                throw new Error("joint does not have bodyB");
            }

            var userData:Object = {};
            userData.name = jointData.name;
            userData.customProperties = jointData.customProperties;
            jointData.userData = userData;


            if (jointData.type === "revolute") {
                createRevoluteJoint(jointData, loadedBodies, world);
            } else if (jointData.type === "distance" || jointData.type === "rope") {
                if (jointData.type === "rope") {
                    //trace("Rope is unsupported using a distance joint instead");
                }
                createDistanceJoint(jointData, loadedBodies, world);

            } else if (jointData.type === "prismatic") {
                createPrismaticJoint(jointData, loadedBodies, world);
            } else if (jointData.type === "wheel") {
                createWheelJoint(jointData, loadedBodies, world);
            } else if (jointData.type === "friction") {
                createFrictionJoint(jointData, loadedBodies, world);
            } else if (jointData.type === "weld") {
                createWeldJoint(jointData, loadedBodies, world);
            } else {
                trace("Unsupported joint type" + jointData.type);
                //throw new Error("Unsupported joint type" + jointData.type);
            }


        }

        public function createWeldJoint(jointData:Object, loadedBodies:Vector.<b2Body>, world:b2World):void
        {
            var jointDef:b2WeldJointDef = new b2WeldJointDef();
            setCommonJointProperties(jointDef, jointData, loadedBodies);
            setJointAnchors(jointDef, jointData, loadedBodies);

            var copier:PropertyCopier = new PropertyCopier(jointData, jointDef);
            var propsToCopy:Vector.<String> = new <String>[
                    "referenceAngle"
            ];
            copier.copyMultiple(propsToCopy);
            var joint:b2Joint = world.CreateJoint(jointDef);
        }

        public function createFrictionJoint(jointData:Object, loadedBodies:Vector.<b2Body>, world:b2World):void
        {
            var jointDef:b2FrictionJointDef = new b2FrictionJointDef();
            setCommonJointProperties(jointDef, jointData, loadedBodies);
            setJointAnchors(jointDef, jointData, loadedBodies);

            var copier:PropertyCopier = new PropertyCopier(jointData, jointDef);
            var propsToCopy:Vector.<String> = new <String>[
                    "maxForce",
                    "maxTorque"
            ];
            copier.copyMultiple(propsToCopy);
            var joint:b2Joint = world.CreateJoint(jointDef);
        }

        public function createWheelJoint(jointData:Object, loadedBodies:Vector.<b2Body>, world:b2World):void
        {
            //Use a line joint and distance joint
            //distance joint
            var jointDef:b2DistanceJointDef = new b2DistanceJointDef();
            setCommonJointProperties(jointDef, jointData, loadedBodies);
            setJointAnchors(jointDef, jointData, loadedBodies);

            jointDef.length = 0;
            var propsToMap:Array = [
                {from: "springDampingRatio", to: "dampingRatio"},
                {from: "springFrequency", to: "frequencyHz"}
            ];
            var copier:PropertyCopier = new PropertyCopier(jointData, jointDef);
            copier.mapMultiple(propsToMap);
            var joint:b2Joint = world.CreateJoint(jointDef);

            //line joint
            var lineJointDef:b2LineJointDef = new b2LineJointDef();
            setCommonJointProperties(lineJointDef, jointData, loadedBodies);
            setJointAnchors(lineJointDef, jointData, loadedBodies);

            lineJointDef.localAxisA = vec2FromObject(jointData.localAxisA);
            joint = world.CreateJoint(lineJointDef);

        }

        public function createPrismaticJoint(jointData:Object, loadedBodies:Vector.<b2Body>, world:b2World):void
        {
            var jointDef:b2PrismaticJointDef = new b2PrismaticJointDef();
            setCommonJointProperties(jointDef, jointData, loadedBodies);
            setJointAnchors(jointDef, jointData, loadedBodies);

            var copier:PropertyCopier = new PropertyCopier(jointData, jointDef);
            copier.copyMultiple(PRISMATIC_PROPS_TO_COPY);
            copier.mapMultiple(PRISMATIC_PROPS_TO_MAP);

            jointDef.localAxisA = vec2FromObject(jointData.localAxisA);

            var joint:b2Joint = world.CreateJoint(jointDef);
        }

        public function createDistanceJoint(jointData:Object, loadedBodies:Vector.<b2Body>, world:b2World):void
        {

            var jointDef:b2DistanceJointDef = new b2DistanceJointDef();
            setCommonJointProperties(jointDef, jointData, loadedBodies);
            setJointAnchors(jointDef, jointData, loadedBodies);

            var copier:PropertyCopier = new PropertyCopier(jointData, jointDef);
            copier.copyMultiple(DISTANCE_PROPS_TO_COPY);
            copier.mapMultiple(DISTANCE_PROPS_TO_MAP);
            var joint:b2Joint = world.CreateJoint(jointDef);
        }

        public function createRevoluteJoint(jointData:Object, loadedBodies:Vector.<b2Body>, world:b2World):void {
            var jointDef:b2RevoluteJointDef = new b2RevoluteJointDef();

            setCommonJointProperties(jointDef, jointData, loadedBodies);
            setJointAnchors(jointDef, jointData, loadedBodies);

            var copier:PropertyCopier = new PropertyCopier(jointData, jointDef);
            copier.copyMultiple(REVOLUTE_PROPS_TO_COPY);
            copier.mapMultiple(REVOLUTE_PROPS_TO_MAP);

            var joint:b2Joint = world.CreateJoint(jointDef);
        }

        public function setCommonJointProperties(jointDef:b2JointDef, jointData:Object, loadedBodies:Vector.<b2Body>):void
        {
            jointDef.bodyA = loadedBodies[jointData.bodyA];
            jointDef.bodyB = loadedBodies[jointData.bodyB];
            jointDef.userData = jointData.userData;


            var copier:PropertyCopier = new PropertyCopier(jointData, jointDef);
            var propertiesToCopy:Vector.<String> = new <String>[
                    "collideConnected"
            ];
            copier.copyMultiple(propertiesToCopy);
        }

        public function setJointAnchors(jointDef:Object, jointData:Object, loadedBodies:Vector.<b2Body>):void
        {
            jointDef.localAnchorA = vec2FromObject(jointData.anchorA, 1);
            jointDef.localAnchorB = vec2FromObject(jointData.anchorB, 1);
        }


        public function vec2FromObject(object:Object, yMultiplier:Number = 1):b2Vec2
        {
            var vec:b2Vec2 = new b2Vec2();
            if (object !== 0) {
                vec.x = object.x;
                vec.y = object.y * yMultiplier;
            }

            return vec;
        }

    }
}
