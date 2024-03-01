import { shaderMaterial } from '@react-three/drei';
import * as T from 'three';

export const blobMaterial = (flatBuffer, colorsArr) =>
	shaderMaterial(
		{
			transparent: true,
			alphaTest: true,
			depthTest: true,
			uColor: null,
			uTexture: null,
			uSpeadPower: 1,
			uPointsArr: flatBuffer,
			uPointScale: 2,
			uPointerPower: new T.Vector2(),
			uPointer: new T.Vector2(),
			uAspect: 1,
			uTime: 1,
			uColorsArray: colorsArr,
		},
		// vertex shader
		`
			varying vec2 vUv;
			varying vec3 vPosition;
			void main() {
				vUv = uv;
				vPosition = position;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}
		`,
		// fragment shader
		`
			varying vec3 vPosition;
			varying vec2 vUv;
			uniform vec3 uColor;
			uniform float uTime;

			uniform vec3 uPointsArr[${flatBuffer.length}];
			// uniform vec3 uColorsArray[${colorsArr.length}];

			uniform float uSpeadPower;
			uniform float uPointScale;
			uniform vec2 uPointer;
      uniform vec2 uPointerPower;
      uniform float uAspect;

      uniform sampler2D uTexture;

			float distBetween(vec2 currentPos, vec2 pointerPos) {
				vec2 diff = currentPos - pointerPos;
				float distance = sqrt(dot(diff, diff));
				return distance;
			}

			bool energyField(in vec2 p, in float gooeyness, in float iso, in vec2 power, in vec2 vPointer)
			{
					float en = 0.0;
					bool result = false;
					for(int i=0; i<${flatBuffer.length}; ++i)
					{


						vec2 newPos = uPointsArr[i].xy;

						float dist = distBetween(newPos, vPointer) / 2.;

						if (dist < .1) dist = .1;

						vec2 offset = power / (dist * dist * dist);

						newPos -= offset / 200.;

						float radius = uPointsArr[i].z;
						float denom =  max(0.0001, pow(length(vec2(newPos - p)), gooeyness));
						en += (radius / denom);
					}
					if(en > iso)
							result = true;
					return result;
			}

			void main()	{


				vec2 vPointer = vec2((uPointer.x - 0.5) * uAspect, 0.5 - uPointer.y);
				vec2 power = clamp(uPointerPower, -.4, .4);

				vec4 color = vec4(1., 1., 1., 1);
				bool blobColor = energyField(vPosition.xy, uPointScale, uSpeadPower, power, vPointer);

				vec3 staticColor = uColor;


				if (blobColor) color = vec4(staticColor.r, staticColor.g, staticColor.b, 1.);

				gl_FragColor = color;
				// float distx = distBetween(vPosition.xy, vPointer) / 2.;
				// if (distx < .005) discard;
			}
		`,
	);

export default blobMaterial;
