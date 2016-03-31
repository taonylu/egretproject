package com.pixeltoyfactory.rube
{
    public class PropertyCopier
    {
        private var from:Object;
        private var to:Object;
        public function PropertyCopier(from:Object, to:Object)
        {
            this.from = from;
            this.to = to;
        }

        public function copyProperty(propertyName:String):void
        {
            mapProperty(propertyName, propertyName);
        }

        public function mapProperty(fromName:String, toName:String):void
        {
            if (from[fromName] !== undefined) {
                to[toName] = from[fromName];
            }
        }

        public function copyMultiple(propertyNames:Vector.<String>):void
        {
            for each(var propertyName:String in propertyNames) {
                copyProperty(propertyName);
            }
        }

        public function mapMultiple(mappings:Array):void
        {
            for each(var map:Object in mappings) {
                mapProperty(map.from, map.to);
            }
        }
    }
}
