uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D texture1;
float PI = 3.14159265358979323846;

void main(){
    vUv=uv;
    vec4 mvPosition = modelViewMatrix*vec4(position, 1.);
    gl_PointSize=100. * (1./-mvPosition.z);
    gl_Position=projectionMatrix*mvPosition;
}