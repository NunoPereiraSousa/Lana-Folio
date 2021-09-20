varying float vNoise;
varying vec2 vUv;
varying float vWave;

uniform sampler2D uImage;
uniform float time;
uniform float hoverState;

void main()	{
	vec2 newUV = vUv;

	float wave = vNoise * 0.01;

	vec3 oceanView = texture2D(uImage, newUV).rgb;

	float r = texture2D(uImage, vUv).r;
  float g = texture2D(uImage, vUv + wave).g;
  float b = texture2D(uImage, vUv + wave).b;
  // Put them back together
  vec3 texture = vec3(r, g, b);
	
	// gl_FragColor.rgb += 5.*vec3(hoverState);
	gl_FragColor = vec4(texture, 1.);
}