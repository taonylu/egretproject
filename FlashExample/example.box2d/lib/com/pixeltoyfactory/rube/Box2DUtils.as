package com.pixeltoyfactory.rube
{
    import Box2D.Dynamics.b2Body;
    import Box2D.Dynamics.b2World;

    public class Box2DUtils
    {
        public static function getNamedBodies(world:b2World, name:String):Vector.<b2Body>
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

    }
}
