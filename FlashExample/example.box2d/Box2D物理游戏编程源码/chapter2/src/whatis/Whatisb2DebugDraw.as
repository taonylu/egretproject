package whatis  
{
	import com.bit101.components.CheckBox;
	import com.bit101.components.Panel;
	
	import flash.display.Sprite;
	import flash.events.Event;
	
	import Box2D.Collision.Shapes.b2PolygonShape;
	import Box2D.Dynamics.b2Body;
	import Box2D.Dynamics.b2DebugDraw;
	import Box2D.Dynamics.b2World;
	import Box2D.Dynamics.Joints.b2RevoluteJointDef;
	
	import ldEasyBox2D.LDEasyBody;
	import ldEasyBox2D.LDEasyShape;
	import ldEasyBox2D.LDEasyWorld;
	
	/**
	 * http://www.ladeng6666.com
	 * @author ladeng6666
	 */
	[SWF(height="400")]
	public class Whatisb2DebugDraw extends Sprite 
	{
		private var world:b2World;
		private var debug:b2DebugDraw;
		private var debugSprite:Sprite;
		private var bodyA:b2Body, bodyB:b2Body, bodyC:b2Body;
		
		private var checkBoxList:Vector.<CheckBox>;
		
		public function Whatisb2DebugDraw() 
		{
			debugSprite = new Sprite();
			addChild(debugSprite);
			world=LDEasyWorld.createWorld();
			debug= LDEasyWorld.createDebug(debugSprite);
			
			//创建地面，
			LDEasyBody.createRectangle(0,0,stage.stageWidth,stage.stageHeight);
			createBodies();
			createRevoluteJoint();

			addEventListener(Event.ENTER_FRAME, loop);
			setupUI();
			trace(stage.stageHeight);
		}
		
		private function createRevoluteJoint():void 
		{
			var revoluteJoint:b2RevoluteJointDef = new b2RevoluteJointDef();
			revoluteJoint.Initialize( bodyA, bodyB, bodyA.GetPosition());
			revoluteJoint.enableMotor = true;
			revoluteJoint.motorSpeed = Math.PI;
			revoluteJoint.maxMotorTorque = 500;
			world.CreateJoint(revoluteJoint);
		}
		private function createBodies():void 
		{
			var shape:b2PolygonShape = LDEasyShape.createBox(10,100);
			bodyA = LDEasyBody.createBox(275,200,100,10);
			bodyA.CreateFixture2(shape,3);
			bodyB = LDEasyBody.createBox(275, 365, 200, 50);
			bodyC = LDEasyBody.createBox(185,200,100,10);
			LDEasyWorld.fixBodyAt(bodyC,185,200);
		}
		
		private function loop(e:Event):void 
		{
			LDEasyWorld.updateWorld(world);
		}
		
		private function setupUI():void 
		{
			var pannel:Panel = new Panel(this, 350, 20);
			pannel.setSize(100,80);
			checkBoxList = new Vector.<CheckBox>();
			checkBoxList.push(new CheckBox(pannel, 5, 5, "e_shapeBit", onChecked));
			checkBoxList.push(new CheckBox(pannel, 5, 20, "e_jointBit", onChecked));
			checkBoxList.push(new CheckBox(pannel, 5, 35, "e_aabbBit", onChecked));
			checkBoxList.push(new CheckBox(pannel, 5, 50, "e_pairBit", onChecked));
			checkBoxList.push(new CheckBox(pannel, 5, 65, "e_centerOfMassBit", onChecked));
			checkBoxList[0].selected=true;
			checkBoxList[1].selected=true;
		}
		
		private function onChecked(e:Event):void 
		{
			var flag:Number = 0;
			var checkbox:CheckBox = e.target as CheckBox;
			if(checkbox.selected){
				debug.AppendFlags( b2DebugDraw[checkbox.label]);
			}else{
				debug.ClearFlags( b2DebugDraw[checkbox.label]);
			}
		}
		
	}

}