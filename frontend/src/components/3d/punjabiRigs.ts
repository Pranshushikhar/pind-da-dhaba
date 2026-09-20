import * as THREE from 'three';

export interface RiggedCharacterResult {
  scene: THREE.Group;
  skeleton: THREE.Skeleton;
  mixer?: THREE.AnimationMixer;
  animations: THREE.AnimationClip[];
}

/**
 * Creates a SkinnedMesh segment with proper skin indices and weights.
 */
function createSkinnedCylinder(
  radiusTop: number,
  radiusBottom: number,
  height: number,
  radialSegments: number,
  heightSegments: number,
  boneIndexBottom: number,
  boneIndexTop: number,
  material: THREE.Material
): THREE.SkinnedMesh {
  const geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    heightSegments,
    true
  );

  // Center cylinder so its base is at y = 0
  geometry.translate(0, height / 2, 0);

  const position = geometry.attributes.position;
  const skinIndices: number[] = [];
  const skinWeights: number[] = [];

  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i);
    const weightTop = Math.max(0, Math.min(1, y / height));
    const weightBottom = 1.0 - weightTop;

    skinIndices.push(boneIndexBottom, boneIndexTop, 0, 0);
    skinWeights.push(weightBottom, weightTop, 0, 0);
  }

  geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
  geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

  const mesh = new THREE.SkinnedMesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Creates the Punjabi Man 3D Rigged Character
 */
export function createPunjabiMan(): RiggedCharacterResult {
  const group = new THREE.Group();
  group.name = 'PunjabiMan';

  // --- LUXURY MATERIALS ---
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xd29062,
    roughness: 0.58,
    metalness: 0.04,
  });

  const turbanMat = new THREE.MeshStandardMaterial({
    color: 0xeb7b18, // Royal Saffron
    roughness: 0.82,
    metalness: 0.08,
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf1c40f, // Imperial Gold
    roughness: 0.28,
    metalness: 0.88,
  });

  const kurtaMat = new THREE.MeshStandardMaterial({
    color: 0xfcfaf4, // Royal Silk Ivory
    roughness: 0.72,
    metalness: 0.02,
  });

  const waistcoatMat = new THREE.MeshStandardMaterial({
    color: 0x6e1b1b, // Deep Mughal Maroon / Terracotta
    roughness: 0.65,
    metalness: 0.12,
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x181412, // Rich dark beard & hair
    roughness: 0.8,
    metalness: 0.05,
  });

  const juttiesMat = new THREE.MeshStandardMaterial({
    color: 0x4a2411, // Handcrafted leather
    roughness: 0.5,
    metalness: 0.2,
  });

  // --- BONE HIERARCHY ---
  // Indices:
  // 0: root, 1: hips, 2: spine, 3: chest, 4: neck, 5: head
  // 6: shoulder_L, 7: upper_arm_L, 8: forearm_L, 9: hand_L
  // 10: shoulder_R, 11: upper_arm_R, 12: forearm_R, 13: hand_R
  // 14: thigh_L, 15: shin_L, 16: foot_L
  // 17: thigh_R, 18: shin_R, 19: foot_R
  const root = new THREE.Bone();
  root.name = 'root';
  root.position.set(0, 0, 0);

  const hips = new THREE.Bone();
  hips.name = 'hips';
  hips.position.set(0, 0.95, 0);
  root.add(hips);

  const spine = new THREE.Bone();
  spine.name = 'spine';
  spine.position.set(0, 0.20, 0);
  hips.add(spine);

  const chest = new THREE.Bone();
  chest.name = 'chest';
  chest.position.set(0, 0.24, 0);
  spine.add(chest);

  const neck = new THREE.Bone();
  neck.name = 'neck';
  neck.position.set(0, 0.16, 0);
  chest.add(neck);

  const head = new THREE.Bone();
  head.name = 'head';
  head.position.set(0, 0.16, 0);
  neck.add(head);

  // Left Arm
  const shoulder_L = new THREE.Bone();
  shoulder_L.name = 'shoulder_L';
  shoulder_L.position.set(-0.16, 0.10, 0);
  chest.add(shoulder_L);

  const upper_arm_L = new THREE.Bone();
  upper_arm_L.name = 'upper_arm_L';
  upper_arm_L.position.set(-0.12, 0, 0);
  shoulder_L.add(upper_arm_L);

  const forearm_L = new THREE.Bone();
  forearm_L.name = 'forearm_L';
  forearm_L.position.set(-0.24, 0, 0);
  upper_arm_L.add(forearm_L);

  const hand_L = new THREE.Bone();
  hand_L.name = 'hand_L';
  hand_L.position.set(-0.20, 0, 0);
  forearm_L.add(hand_L);

  // Right Arm
  const shoulder_R = new THREE.Bone();
  shoulder_R.name = 'shoulder_R';
  shoulder_R.position.set(0.16, 0.10, 0);
  chest.add(shoulder_R);

  const upper_arm_R = new THREE.Bone();
  upper_arm_R.name = 'upper_arm_R';
  upper_arm_R.position.set(0.12, 0, 0);
  shoulder_R.add(upper_arm_R);

  const forearm_R = new THREE.Bone();
  forearm_R.name = 'forearm_R';
  forearm_R.position.set(0.24, 0, 0);
  upper_arm_R.add(forearm_R);

  const hand_R = new THREE.Bone();
  hand_R.name = 'hand_R';
  hand_R.position.set(0.20, 0, 0);
  forearm_R.add(hand_R);

  // Left Leg
  const thigh_L = new THREE.Bone();
  thigh_L.name = 'thigh_L';
  thigh_L.position.set(-0.12, -0.05, 0);
  hips.add(thigh_L);

  const shin_L = new THREE.Bone();
  shin_L.name = 'shin_L';
  shin_L.position.set(0, -0.44, 0);
  thigh_L.add(shin_L);

  const foot_L = new THREE.Bone();
  foot_L.name = 'foot_L';
  foot_L.position.set(0, -0.44, 0.08);
  shin_L.add(foot_L);

  // Right Leg
  const thigh_R = new THREE.Bone();
  thigh_R.name = 'thigh_R';
  thigh_R.position.set(0.12, -0.05, 0);
  hips.add(thigh_R);

  const shin_R = new THREE.Bone();
  shin_R.name = 'shin_R';
  shin_R.position.set(0, -0.44, 0);
  thigh_R.add(shin_R);

  const foot_R = new THREE.Bone();
  foot_R.name = 'foot_R';
  foot_R.position.set(0, -0.44, 0.08);
  shin_R.add(foot_R);

  const bones = [
    root, hips, spine, chest, neck, head,
    shoulder_L, upper_arm_L, forearm_L, hand_L,
    shoulder_R, upper_arm_R, forearm_R, hand_R,
    thigh_L, shin_L, foot_L,
    thigh_R, shin_R, foot_R
  ];

  const skeleton = new THREE.Skeleton(bones);

  // --- SKINNED MESH BODY SEGMENTS ---
  // Torso (Spine to Chest)
  const torsoMesh = createSkinnedCylinder(0.22, 0.18, 0.44, 16, 6, 1, 3, kurtaMat);
  torsoMesh.bind(skeleton);
  group.add(torsoMesh);

  // Waistcoat / Sadri outer layer
  const waistcoatMesh = createSkinnedCylinder(0.23, 0.19, 0.38, 16, 6, 1, 3, waistcoatMat);
  waistcoatMesh.position.set(0, 0.04, 0.005);
  waistcoatMesh.bind(skeleton);
  group.add(waistcoatMesh);

  // Golden trim on waistcoat front
  const trimGeo = new THREE.BoxGeometry(0.02, 0.36, 0.02);
  const trimMesh = new THREE.Mesh(trimGeo, goldMat);
  trimMesh.position.set(0, 0.20, 0.19);
  chest.add(trimMesh);

  // Head Mesh & Authentic Features (Attached to Head bone)
  const headGroup = new THREE.Group();
  head.add(headGroup);

  const headFaceGeo = new THREE.SphereGeometry(0.13, 20, 18);
  headFaceGeo.scale(0.9, 1.1, 0.95);
  const headFaceMesh = new THREE.Mesh(headFaceGeo, skinMat);
  headFaceMesh.position.set(0, 0.04, 0);
  headGroup.add(headFaceMesh);

  // Elegant Styled Beard
  const beardGeo = new THREE.ConeGeometry(0.12, 0.18, 14);
  beardGeo.rotateX(Math.PI);
  const beardMesh = new THREE.Mesh(beardGeo, hairMat);
  beardMesh.position.set(0, -0.06, 0.06);
  headGroup.add(beardMesh);

  // Styled Moustache
  const stacheGeo = new THREE.CylinderGeometry(0.022, 0.015, 0.15, 10);
  stacheGeo.rotateZ(Math.PI / 2);
  const stacheMesh = new THREE.Mesh(stacheGeo, hairMat);
  stacheMesh.position.set(0, 0.02, 0.125);
  headGroup.add(stacheMesh);

  // Punjabi Turban (Dastar / Pagri)
  const turbanBaseGeo = new THREE.CylinderGeometry(0.17, 0.15, 0.18, 20);
  const turbanBaseMesh = new THREE.Mesh(turbanBaseGeo, turbanMat);
  turbanBaseMesh.position.set(0, 0.12, -0.01);
  headGroup.add(turbanBaseMesh);

  // Pleated wraps around turban
  const wrapGeo = new THREE.TorusGeometry(0.165, 0.045, 12, 24);
  wrapGeo.rotateX(Math.PI / 2 + 0.15);
  const wrapMesh = new THREE.Mesh(wrapGeo, turbanMat);
  wrapMesh.position.set(0, 0.09, 0);
  headGroup.add(wrapMesh);

  // Traditional Turban Fan Crest (Turla)
  const turlaGeo = new THREE.ConeGeometry(0.11, 0.20, 16, 1, false, 0, Math.PI);
  const turlaMesh = new THREE.Mesh(turlaGeo, turbanMat);
  turlaMesh.position.set(0.04, 0.26, 0.04);
  turlaMesh.rotation.set(-0.2, 0.1, 0.15);
  headGroup.add(turlaMesh);

  // Imperial Gold Kalgi ornament on turban
  const kalgiGeo = new THREE.CylinderGeometry(0.015, 0.005, 0.12, 8);
  const kalgiMesh = new THREE.Mesh(kalgiGeo, goldMat);
  kalgiMesh.position.set(0, 0.16, 0.15);
  headGroup.add(kalgiMesh);

  // Arms Skinned Meshes
  // Left Arm (upper_arm_L to forearm_L)
  const armL_Mesh = createSkinnedCylinder(0.065, 0.055, 0.24, 12, 4, 7, 8, kurtaMat);
  armL_Mesh.rotation.z = Math.PI / 2;
  armL_Mesh.bind(skeleton);
  group.add(armL_Mesh);

  // Left Forearm (forearm_L to hand_L)
  const forearmL_Mesh = createSkinnedCylinder(0.055, 0.045, 0.20, 12, 4, 8, 9, skinMat);
  forearmL_Mesh.rotation.z = Math.PI / 2;
  forearmL_Mesh.bind(skeleton);
  group.add(forearmL_Mesh);

  // Left Hand (Attached to hand_L bone)
  const handL_Geo = new THREE.BoxGeometry(0.05, 0.08, 0.06);
  const handL_Mesh = new THREE.Mesh(handL_Geo, skinMat);
  handL_Mesh.position.set(-0.04, 0, 0);
  hand_L.add(handL_Mesh);

  // Right Arm (upper_arm_R to forearm_R)
  const armR_Mesh = createSkinnedCylinder(0.065, 0.055, 0.24, 12, 4, 11, 12, kurtaMat);
  armR_Mesh.rotation.z = -Math.PI / 2;
  armR_Mesh.bind(skeleton);
  group.add(armR_Mesh);

  // Right Forearm (forearm_R to hand_R)
  const forearmR_Mesh = createSkinnedCylinder(0.055, 0.045, 0.20, 12, 4, 12, 13, skinMat);
  forearmR_Mesh.rotation.z = -Math.PI / 2;
  forearmR_Mesh.bind(skeleton);
  group.add(forearmR_Mesh);

  // Right Hand (Attached to hand_R bone)
  const handR_Geo = new THREE.BoxGeometry(0.05, 0.08, 0.06);
  const handR_Mesh = new THREE.Mesh(handR_Geo, skinMat);
  handR_Mesh.position.set(0.04, 0, 0);
  hand_R.add(handR_Mesh);

  // Legs (Pleated Kurta / Pyjama Trousers)
  const legL_Mesh = createSkinnedCylinder(0.09, 0.07, 0.44, 12, 4, 14, 15, kurtaMat);
  legL_Mesh.rotation.x = Math.PI;
  legL_Mesh.bind(skeleton);
  group.add(legL_Mesh);

  const calfL_Mesh = createSkinnedCylinder(0.07, 0.055, 0.44, 12, 4, 15, 16, kurtaMat);
  calfL_Mesh.rotation.x = Math.PI;
  calfL_Mesh.bind(skeleton);
  group.add(calfL_Mesh);

  const legR_Mesh = createSkinnedCylinder(0.09, 0.07, 0.44, 12, 4, 17, 18, kurtaMat);
  legR_Mesh.rotation.x = Math.PI;
  legR_Mesh.bind(skeleton);
  group.add(legR_Mesh);

  const calfR_Mesh = createSkinnedCylinder(0.07, 0.055, 0.44, 12, 4, 18, 19, kurtaMat);
  calfR_Mesh.rotation.x = Math.PI;
  calfR_Mesh.bind(skeleton);
  group.add(calfR_Mesh);

  // Traditional Punjabi Juttis (Attached to Foot bones)
  const juttiGeo = new THREE.BoxGeometry(0.09, 0.06, 0.19);
  juttiGeo.translate(0, -0.02, 0.05);

  const juttiL = new THREE.Mesh(juttiGeo, juttiesMat);
  foot_L.add(juttiL);

  const juttiR = new THREE.Mesh(juttiGeo, juttiesMat);
  foot_R.add(juttiR);

  group.add(root);

  // --- SKELETAL ANIMATIONS ---
  // 1. BHANGRA ANIMATION CLIP (4.8s seamless loop)
  const bhangraDuration = 4.8;
  const bhangraFrames = 25;
  const times: number[] = [];
  for (let i = 0; i < bhangraFrames; i++) {
    times.push((i / (bhangraFrames - 1)) * bhangraDuration);
  }

  // Hips Position Bounce
  const hipsPosValues: number[] = [];
  const hipsRotValues: number[] = [];
  const spineRotValues: number[] = [];
  const chestRotValues: number[] = [];
  const headRotValues: number[] = [];
  const upperArmLRotValues: number[] = [];
  const forearmLRotValues: number[] = [];
  const handLRotValues: number[] = [];
  const upperArmRRotValues: number[] = [];
  const forearmRRotValues: number[] = [];
  const handRRotValues: number[] = [];
  const thighLRotValues: number[] = [];
  const thighRRotValues: number[] = [];

  const euler = new THREE.Euler();
  const q = new THREE.Quaternion();

  for (let i = 0; i < bhangraFrames; i++) {
    const t = times[i];
    const phase = (t / bhangraDuration) * Math.PI * 2; // 0 to 2PI

    // Torso vertical bounce (two rhythmic bounces per measure)
    const bounceY = 0.95 + 0.035 * Math.abs(Math.sin(phase * 2));
    hipsPosValues.push(0, bounceY, 0);

    // Hips rhythmic sway
    euler.set(0, 0, 0.035 * Math.sin(phase));
    q.setFromEuler(euler);
    hipsRotValues.push(q.x, q.y, q.z, q.w);

    // Spine twist & groove
    euler.set(0.02 * Math.cos(phase * 2), 0.04 * Math.sin(phase), 0);
    q.setFromEuler(euler);
    spineRotValues.push(q.x, q.y, q.z, q.w);

    // Chest shoulder shrug
    euler.set(0, 0.05 * Math.sin(phase), 0.04 * Math.cos(phase));
    q.setFromEuler(euler);
    chestRotValues.push(q.x, q.y, q.z, q.w);

    // Head rhythmic confident nod & tilt
    euler.set(0.04 * Math.sin(phase * 2), 0.06 * Math.sin(phase), 0.03 * Math.cos(phase));
    q.setFromEuler(euler);
    headRotValues.push(q.x, q.y, q.z, q.w);

    // Left Arm (Classic high raised Bhangra pose + rhythmic shoulder pump)
    // Arm raised ~110-130 deg, forearm bent ~80 deg
    const armLPump = 0.15 * Math.sin(phase);
    euler.set(0.2 + 0.1 * Math.sin(phase * 2), 0.3, 1.95 + armLPump);
    q.setFromEuler(euler);
    upperArmLRotValues.push(q.x, q.y, q.z, q.w);

    euler.set(0, 0, -1.25 + 0.15 * Math.cos(phase * 2));
    q.setFromEuler(euler);
    forearmLRotValues.push(q.x, q.y, q.z, q.w);

    // Bhangra wrist twist snap
    euler.set(0.2 * Math.sin(phase * 2), 0.4 * Math.cos(phase * 2), 0);
    q.setFromEuler(euler);
    handLRotValues.push(q.x, q.y, q.z, q.w);

    // Right Arm (Alternating rhythmic Bhangra wave)
    const armRPump = -0.15 * Math.sin(phase);
    euler.set(-0.2 + 0.1 * Math.cos(phase * 2), -0.3, -1.85 + armRPump);
    q.setFromEuler(euler);
    upperArmRRotValues.push(q.x, q.y, q.z, q.w);

    euler.set(0, 0, 1.25 - 0.15 * Math.sin(phase * 2));
    q.setFromEuler(euler);
    forearmRRotValues.push(q.x, q.y, q.z, q.w);

    euler.set(-0.2 * Math.sin(phase * 2), -0.4 * Math.cos(phase * 2), 0);
    q.setFromEuler(euler);
    handRRotValues.push(q.x, q.y, q.z, q.w);

    // Legs rhythmically shifting weight
    euler.set(-0.12 * Math.max(0, Math.sin(phase)), 0, 0.05);
    q.setFromEuler(euler);
    thighLRotValues.push(q.x, q.y, q.z, q.w);

    euler.set(-0.12 * Math.max(0, -Math.sin(phase)), 0, -0.05);
    q.setFromEuler(euler);
    thighRRotValues.push(q.x, q.y, q.z, q.w);
  }

  const bhangraTracks: THREE.KeyframeTrack[] = [
    new THREE.VectorKeyframeTrack('hips.position', times, hipsPosValues),
    new THREE.QuaternionKeyframeTrack('hips.quaternion', times, hipsRotValues),
    new THREE.QuaternionKeyframeTrack('spine.quaternion', times, spineRotValues),
    new THREE.QuaternionKeyframeTrack('chest.quaternion', times, chestRotValues),
    new THREE.QuaternionKeyframeTrack('head.quaternion', times, headRotValues),
    new THREE.QuaternionKeyframeTrack('upper_arm_L.quaternion', times, upperArmLRotValues),
    new THREE.QuaternionKeyframeTrack('forearm_L.quaternion', times, forearmLRotValues),
    new THREE.QuaternionKeyframeTrack('hand_L.quaternion', times, handLRotValues),
    new THREE.QuaternionKeyframeTrack('upper_arm_R.quaternion', times, upperArmRRotValues),
    new THREE.QuaternionKeyframeTrack('forearm_R.quaternion', times, forearmRRotValues),
    new THREE.QuaternionKeyframeTrack('hand_R.quaternion', times, handRRotValues),
    new THREE.QuaternionKeyframeTrack('thigh_L.quaternion', times, thighLRotValues),
    new THREE.QuaternionKeyframeTrack('thigh_R.quaternion', times, thighRRotValues),
  ];

  const bhangraClip = new THREE.AnimationClip('Bhangra', bhangraDuration, bhangraTracks);

  // 2. IDLE CLIP (4.0s loop)
  const idleDuration = 4.0;
  const idleTimes = [0, 1.0, 2.0, 3.0, 4.0];
  const idleChestRot: number[] = [];
  const idleHeadRot: number[] = [];
  const idleHipsPos: number[] = [];

  for (let i = 0; i < idleTimes.length; i++) {
    const p = (idleTimes[i] / idleDuration) * Math.PI * 2;
    idleHipsPos.push(0, 0.95 + 0.008 * Math.sin(p), 0);

    euler.set(0.02 * Math.sin(p), 0, 0);
    q.setFromEuler(euler);
    idleChestRot.push(q.x, q.y, q.z, q.w);

    euler.set(-0.01 * Math.sin(p), 0.02 * Math.cos(p), 0);
    q.setFromEuler(euler);
    idleHeadRot.push(q.x, q.y, q.z, q.w);
  }

  const idleTracks: THREE.KeyframeTrack[] = [
    new THREE.VectorKeyframeTrack('hips.position', idleTimes, idleHipsPos),
    new THREE.QuaternionKeyframeTrack('chest.quaternion', idleTimes, idleChestRot),
    new THREE.QuaternionKeyframeTrack('head.quaternion', idleTimes, idleHeadRot),
  ];

  const idleClip = new THREE.AnimationClip('Idle', idleDuration, idleTracks);

  return {
    scene: group,
    skeleton,
    animations: [bhangraClip, idleClip],
  };
}

/**
 * Creates the Punjabi Woman 3D Rigged Character
 */
export function createPunjabiWoman(): RiggedCharacterResult {
  const group = new THREE.Group();
  group.name = 'PunjabiWoman';

  // --- LUXURY HOSPITALITY MATERIALS ---
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xdeb08a,
    roughness: 0.52,
    metalness: 0.04,
  });

  const dressMat = new THREE.MeshStandardMaterial({
    color: 0x9b2c2c, // Rich Ruby Terracotta / Wine Silk
    roughness: 0.62,
    metalness: 0.12,
  });

  const dupattaMat = new THREE.MeshStandardMaterial({
    color: 0xc53030, // Flowing Coral Crimson Dupatta
    roughness: 0.70,
    metalness: 0.10,
    side: THREE.DoubleSide,
  });

  const goldZariMat = new THREE.MeshStandardMaterial({
    color: 0xf1c40f, // Pure 24K Zari Embroidery
    roughness: 0.25,
    metalness: 0.92,
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x161210, // Glossy black hair
    roughness: 0.65,
    metalness: 0.1,
  });

  const salwarMat = new THREE.MeshStandardMaterial({
    color: 0xfbf8f1, // Pleated Royal Ivory Salwar
    roughness: 0.75,
    metalness: 0.02,
  });

  // --- BONE HIERARCHY ---
  const root = new THREE.Bone();
  root.name = 'root';
  root.position.set(0, 0, 0);

  const hips = new THREE.Bone();
  hips.name = 'hips';
  hips.position.set(0, 0.92, 0);
  root.add(hips);

  const spine = new THREE.Bone();
  spine.name = 'spine';
  spine.position.set(0, 0.19, 0);
  hips.add(spine);

  const chest = new THREE.Bone();
  chest.name = 'chest';
  chest.position.set(0, 0.22, 0);
  spine.add(chest);

  const neck = new THREE.Bone();
  neck.name = 'neck';
  neck.position.set(0, 0.15, 0);
  chest.add(neck);

  const head = new THREE.Bone();
  head.name = 'head';
  head.position.set(0, 0.15, 0);
  neck.add(head);

  // Left Arm
  const shoulder_L = new THREE.Bone();
  shoulder_L.name = 'shoulder_L';
  shoulder_L.position.set(-0.14, 0.08, 0);
  chest.add(shoulder_L);

  const upper_arm_L = new THREE.Bone();
  upper_arm_L.name = 'upper_arm_L';
  upper_arm_L.position.set(-0.11, 0, 0);
  shoulder_L.add(upper_arm_L);

  const forearm_L = new THREE.Bone();
  forearm_L.name = 'forearm_L';
  forearm_L.position.set(-0.22, 0, 0);
  upper_arm_L.add(forearm_L);

  const hand_L = new THREE.Bone();
  hand_L.name = 'hand_L';
  hand_L.position.set(-0.18, 0, 0);
  forearm_L.add(hand_L);

  // Right Arm
  const shoulder_R = new THREE.Bone();
  shoulder_R.name = 'shoulder_R';
  shoulder_R.position.set(0.14, 0.08, 0);
  chest.add(shoulder_R);

  const upper_arm_R = new THREE.Bone();
  upper_arm_R.name = 'upper_arm_R';
  upper_arm_R.position.set(0.12, 0, 0);
  shoulder_R.add(upper_arm_R);

  const forearm_R = new THREE.Bone();
  forearm_R.name = 'forearm_R';
  forearm_R.position.set(0.22, 0, 0);
  upper_arm_R.add(forearm_R);

  const hand_R = new THREE.Bone();
  hand_R.name = 'hand_R';
  hand_R.position.set(0.18, 0, 0);
  forearm_R.add(hand_R);

  // Left Leg
  const thigh_L = new THREE.Bone();
  thigh_L.name = 'thigh_L';
  thigh_L.position.set(-0.11, -0.04, 0);
  hips.add(thigh_L);

  const shin_L = new THREE.Bone();
  shin_L.name = 'shin_L';
  shin_L.position.set(0, -0.42, 0);
  thigh_L.add(shin_L);

  const foot_L = new THREE.Bone();
  foot_L.name = 'foot_L';
  foot_L.position.set(0, -0.42, 0.07);
  shin_L.add(foot_L);

  // Right Leg
  const thigh_R = new THREE.Bone();
  thigh_R.name = 'thigh_R';
  thigh_R.position.set(0.11, -0.04, 0);
  hips.add(thigh_R);

  const shin_R = new THREE.Bone();
  shin_R.name = 'shin_R';
  shin_R.position.set(0, -0.42, 0);
  thigh_R.add(shin_R);

  const foot_R = new THREE.Bone();
  foot_R.name = 'foot_R';
  foot_R.position.set(0, -0.42, 0.07);
  shin_R.add(foot_R);

  const bones = [
    root, hips, spine, chest, neck, head,
    shoulder_L, upper_arm_L, forearm_L, hand_L,
    shoulder_R, upper_arm_R, forearm_R, hand_R,
    thigh_L, shin_L, foot_L,
    thigh_R, shin_R, foot_R
  ];

  const skeleton = new THREE.Skeleton(bones);

  // --- SKINNED MESHES ---
  // Elegant Tailored Kurti
  const kurtiMesh = createSkinnedCylinder(0.20, 0.22, 0.46, 16, 6, 1, 3, dressMat);
  kurtiMesh.bind(skeleton);
  group.add(kurtiMesh);

  // Gold Zari Border on Kurti
  const zariTrimGeo = new THREE.TorusGeometry(0.222, 0.015, 8, 24);
  zariTrimGeo.rotateX(Math.PI / 2);
  const zariTrimMesh = new THREE.Mesh(zariTrimGeo, goldZariMat);
  zariTrimMesh.position.set(0, 0.02, 0);
  hips.add(zariTrimMesh);

  // Head Mesh & Authentic Features
  const headGroup = new THREE.Group();
  head.add(headGroup);

  const headFaceGeo = new THREE.SphereGeometry(0.12, 20, 18);
  headFaceGeo.scale(0.88, 1.08, 0.92);
  const headFaceMesh = new THREE.Mesh(headFaceGeo, skinMat);
  headFaceMesh.position.set(0, 0.03, 0);
  headGroup.add(headFaceMesh);

  // Graceful Hair Bun / Braid
  const hairGeo = new THREE.SphereGeometry(0.125, 18, 16);
  hairGeo.scale(0.92, 1.05, 0.95);
  const hairMesh = new THREE.Mesh(hairGeo, hairMat);
  hairMesh.position.set(0, 0.05, -0.03);
  headGroup.add(hairMesh);

  // Traditional Punjabi Dupatta / Chunni draped gracefully over head
  const dupattaHeadGeo = new THREE.SphereGeometry(0.142, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.65);
  const dupattaHeadMesh = new THREE.Mesh(dupattaHeadGeo, dupattaMat);
  dupattaHeadMesh.position.set(0, 0.045, -0.01);
  headGroup.add(dupattaHeadMesh);

  // Dupatta drape folds descending over shoulders
  const drapeGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.42, 16, 4, true, -Math.PI * 0.35, Math.PI * 1.7);
  const drapeMesh = new THREE.Mesh(drapeGeo, dupattaMat);
  drapeMesh.position.set(0, -0.15, -0.02);
  chest.add(drapeMesh);

  // Gold Zari lace on Dupatta edge
  const dupattaLaceGeo = new THREE.TorusGeometry(0.145, 0.009, 8, 24, Math.PI);
  dupattaLaceGeo.rotateX(-0.35);
  const dupattaLaceMesh = new THREE.Mesh(dupattaLaceGeo, goldZariMat);
  dupattaLaceMesh.position.set(0, 0.09, 0.08);
  headGroup.add(dupattaLaceMesh);

  // Traditional Gold Jhumkas (Earrings)
  const jhumkaGeo = new THREE.ConeGeometry(0.018, 0.035, 10);
  const jhumkaL = new THREE.Mesh(jhumkaGeo, goldZariMat);
  jhumkaL.position.set(-0.115, -0.02, 0);
  headGroup.add(jhumkaL);

  const jhumkaR = new THREE.Mesh(jhumkaGeo, goldZariMat);
  jhumkaR.position.set(0.115, -0.02, 0);
  headGroup.add(jhumkaR);

  // Maang Tikka on Forehead
  const tikkaGeo = new THREE.SphereGeometry(0.014, 8, 8);
  const tikkaMesh = new THREE.Mesh(tikkaGeo, goldZariMat);
  tikkaMesh.position.set(0, 0.09, 0.11);
  headGroup.add(tikkaMesh);

  // Arms Skinned Meshes
  const armL_Mesh = createSkinnedCylinder(0.055, 0.045, 0.22, 12, 4, 7, 8, dressMat);
  armL_Mesh.rotation.z = Math.PI / 2;
  armL_Mesh.bind(skeleton);
  group.add(armL_Mesh);

  const forearmL_Mesh = createSkinnedCylinder(0.045, 0.038, 0.18, 12, 4, 8, 9, skinMat);
  forearmL_Mesh.rotation.z = Math.PI / 2;
  forearmL_Mesh.bind(skeleton);
  group.add(forearmL_Mesh);

  // Golden Bangles (Left wrist)
  const bangleGeo = new THREE.TorusGeometry(0.042, 0.006, 8, 16);
  const bangleL = new THREE.Mesh(bangleGeo, goldZariMat);
  bangleL.position.set(-0.02, 0, 0);
  bangleL.rotation.y = Math.PI / 2;
  hand_L.add(bangleL);

  const handL_Geo = new THREE.BoxGeometry(0.04, 0.07, 0.05);
  const handL_Mesh = new THREE.Mesh(handL_Geo, skinMat);
  handL_Mesh.position.set(-0.035, 0, 0);
  hand_L.add(handL_Mesh);

  const armR_Mesh = createSkinnedCylinder(0.055, 0.045, 0.22, 12, 4, 11, 12, dressMat);
  armR_Mesh.rotation.z = -Math.PI / 2;
  armR_Mesh.bind(skeleton);
  group.add(armR_Mesh);

  const forearmR_Mesh = createSkinnedCylinder(0.045, 0.038, 0.18, 12, 4, 12, 13, skinMat);
  forearmR_Mesh.rotation.z = -Math.PI / 2;
  forearmR_Mesh.bind(skeleton);
  group.add(forearmR_Mesh);

  // Golden Bangles (Right wrist)
  const bangleR = new THREE.Mesh(bangleGeo, goldZariMat);
  bangleR.position.set(0.02, 0, 0);
  bangleR.rotation.y = Math.PI / 2;
  hand_R.add(bangleR);

  const handR_Geo = new THREE.BoxGeometry(0.04, 0.07, 0.05);
  const handR_Mesh = new THREE.Mesh(handR_Geo, skinMat);
  handR_Mesh.position.set(0.035, 0, 0);
  hand_R.add(handR_Mesh);

  // Legs (Salwar)
  const legL_Mesh = createSkinnedCylinder(0.085, 0.065, 0.42, 12, 4, 14, 15, salwarMat);
  legL_Mesh.rotation.x = Math.PI;
  legL_Mesh.bind(skeleton);
  group.add(legL_Mesh);

  const calfL_Mesh = createSkinnedCylinder(0.065, 0.05, 0.42, 12, 4, 15, 16, salwarMat);
  calfL_Mesh.rotation.x = Math.PI;
  calfL_Mesh.bind(skeleton);
  group.add(calfL_Mesh);

  const legR_Mesh = createSkinnedCylinder(0.085, 0.065, 0.42, 12, 4, 17, 18, salwarMat);
  legR_Mesh.rotation.x = Math.PI;
  legR_Mesh.bind(skeleton);
  group.add(legR_Mesh);

  const calfR_Mesh = createSkinnedCylinder(0.065, 0.05, 0.42, 12, 4, 18, 19, salwarMat);
  calfR_Mesh.rotation.x = Math.PI;
  calfR_Mesh.bind(skeleton);
  group.add(calfR_Mesh);

  // Traditional Embroidered Juttis
  const juttiGeo = new THREE.BoxGeometry(0.08, 0.05, 0.18);
  juttiGeo.translate(0, -0.02, 0.045);

  const juttiMat = new THREE.MeshStandardMaterial({
    color: 0x802020,
    roughness: 0.45,
    metalness: 0.3,
  });

  const juttiL = new THREE.Mesh(juttiGeo, juttiMat);
  foot_L.add(juttiL);

  const juttiR = new THREE.Mesh(juttiGeo, juttiMat);
  foot_R.add(juttiR);

  group.add(root);

  // --- SKELETAL ANIMATIONS ---
  // 1. NAMASTE GREETING CLIP (5.2s seamless loop)
  const namasteDuration = 5.2;
  const namasteFrames = 27;
  const times: number[] = [];
  for (let i = 0; i < namasteFrames; i++) {
    times.push((i / (namasteFrames - 1)) * namasteDuration);
  }

  const hipsPosValues: number[] = [];
  const spineRotValues: number[] = [];
  const chestRotValues: number[] = [];
  const headRotValues: number[] = [];
  const upperArmLRotValues: number[] = [];
  const forearmLRotValues: number[] = [];
  const handLRotValues: number[] = [];
  const upperArmRRotValues: number[] = [];
  const forearmRRotValues: number[] = [];
  const handRRotValues: number[] = [];

  const euler = new THREE.Euler();
  const q = new THREE.Quaternion();

  for (let i = 0; i < namasteFrames; i++) {
    const t = times[i];
    const normalized = t / namasteDuration; // 0 to 1

    // Motion curve for Namaste:
    // 0.0 - 0.2: Transition from relaxed to Namaste hands
    // 0.2 - 0.7: Hold Namaste greeting with respectful head bow
    // 0.7 - 1.0: Graceful return to relaxed pose
    let namasteWeight = 0;
    if (normalized < 0.25) {
      namasteWeight = 0.5 - 0.5 * Math.cos((normalized / 0.25) * Math.PI);
    } else if (normalized < 0.75) {
      namasteWeight = 1.0;
    } else {
      namasteWeight = 0.5 + 0.5 * Math.cos(((normalized - 0.75) / 0.25) * Math.PI);
    }

    // Subtle respectful head bow during the Namaste hold (peak around normalized 0.45 - 0.55)
    let bowWeight = 0;
    if (normalized >= 0.30 && normalized <= 0.70) {
      bowWeight = Math.sin(((normalized - 0.30) / 0.40) * Math.PI);
    }

    // Gentle breathing oscillation
    const breath = Math.sin(normalized * Math.PI * 4);
    hipsPosValues.push(0, 0.92 + 0.006 * breath, 0);

    // Spine subtle forward tilt during greeting
    euler.set(0.04 * bowWeight + 0.015 * breath, 0, 0);
    q.setFromEuler(euler);
    spineRotValues.push(q.x, q.y, q.z, q.w);

    // Chest expansion
    euler.set(0.03 * namasteWeight + 0.02 * breath, 0, 0);
    q.setFromEuler(euler);
    chestRotValues.push(q.x, q.y, q.z, q.w);

    // Head respectful bow & tilt
    euler.set(0.18 * bowWeight - 0.02 * breath, 0.03 * Math.sin(normalized * Math.PI * 2), 0);
    q.setFromEuler(euler);
    headRotValues.push(q.x, q.y, q.z, q.w);

    // Left Arm (Moves gracefully inward to prayer position in front of chest)
    // Relaxed pose: upperArm ~0.2, -0.1, 0.15; forearm ~0.3
    // Namaste pose: upperArm folds inward (X: 0.75, Y: 0.45, Z: 0.65), forearm bends ~110 deg inward
    const uArmLX = THREE.MathUtils.lerp(0.15, 0.72, namasteWeight);
    const uArmLY = THREE.MathUtils.lerp(0.05, 0.35, namasteWeight);
    const uArmLZ = THREE.MathUtils.lerp(0.20, 0.75, namasteWeight);
    euler.set(uArmLX, uArmLY, uArmLZ);
    q.setFromEuler(euler);
    upperArmLRotValues.push(q.x, q.y, q.z, q.w);

    const fArmLZ = THREE.MathUtils.lerp(0.25, -1.75, namasteWeight);
    euler.set(0, 0, fArmLZ);
    q.setFromEuler(euler);
    forearmLRotValues.push(q.x, q.y, q.z, q.w);

    const handLZ = THREE.MathUtils.lerp(0.1, 0.45, namasteWeight);
    euler.set(0, 0, handLZ);
    q.setFromEuler(euler);
    handLRotValues.push(q.x, q.y, q.z, q.w);

    // Right Arm (Symmetric prayer fold)
    const uArmRX = THREE.MathUtils.lerp(0.15, 0.72, namasteWeight);
    const uArmRY = THREE.MathUtils.lerp(-0.05, -0.35, namasteWeight);
    const uArmRZ = THREE.MathUtils.lerp(-0.20, -0.75, namasteWeight);
    euler.set(uArmRX, uArmRY, uArmRZ);
    q.setFromEuler(euler);
    upperArmRRotValues.push(q.x, q.y, q.z, q.w);

    const fArmRZ = THREE.MathUtils.lerp(-0.25, 1.75, namasteWeight);
    euler.set(0, 0, fArmRZ);
    q.setFromEuler(euler);
    forearmRRotValues.push(q.x, q.y, q.z, q.w);

    const handRZ = THREE.MathUtils.lerp(-0.1, -0.45, namasteWeight);
    euler.set(0, 0, handRZ);
    q.setFromEuler(euler);
    handRRotValues.push(q.x, q.y, q.z, q.w);
  }

  const namasteTracks: THREE.KeyframeTrack[] = [
    new THREE.VectorKeyframeTrack('hips.position', times, hipsPosValues),
    new THREE.QuaternionKeyframeTrack('spine.quaternion', times, spineRotValues),
    new THREE.QuaternionKeyframeTrack('chest.quaternion', times, chestRotValues),
    new THREE.QuaternionKeyframeTrack('head.quaternion', times, headRotValues),
    new THREE.QuaternionKeyframeTrack('upper_arm_L.quaternion', times, upperArmLRotValues),
    new THREE.QuaternionKeyframeTrack('forearm_L.quaternion', times, forearmLRotValues),
    new THREE.QuaternionKeyframeTrack('hand_L.quaternion', times, handLRotValues),
    new THREE.QuaternionKeyframeTrack('upper_arm_R.quaternion', times, upperArmRRotValues),
    new THREE.QuaternionKeyframeTrack('forearm_R.quaternion', times, forearmRRotValues),
    new THREE.QuaternionKeyframeTrack('hand_R.quaternion', times, handRRotValues),
  ];

  const namasteClip = new THREE.AnimationClip('Namaste', namasteDuration, namasteTracks);

  // 2. IDLE CLIP (4.0s loop)
  const idleDuration = 4.0;
  const idleTimes = [0, 1.0, 2.0, 3.0, 4.0];
  const idleChestRot: number[] = [];
  const idleHeadRot: number[] = [];
  const idleHipsPos: number[] = [];

  for (let i = 0; i < idleTimes.length; i++) {
    const p = (idleTimes[i] / idleDuration) * Math.PI * 2;
    idleHipsPos.push(0, 0.92 + 0.007 * Math.sin(p), 0);

    euler.set(0.02 * Math.sin(p), 0, 0);
    q.setFromEuler(euler);
    idleChestRot.push(q.x, q.y, q.z, q.w);

    euler.set(0.01 * Math.sin(p), 0.015 * Math.cos(p), 0);
    q.setFromEuler(euler);
    idleHeadRot.push(q.x, q.y, q.z, q.w);
  }

  const idleTracks: THREE.KeyframeTrack[] = [
    new THREE.VectorKeyframeTrack('hips.position', idleTimes, idleHipsPos),
    new THREE.QuaternionKeyframeTrack('chest.quaternion', idleTimes, idleChestRot),
    new THREE.QuaternionKeyframeTrack('head.quaternion', idleTimes, idleHeadRot),
  ];

  const idleClip = new THREE.AnimationClip('Idle', idleDuration, idleTracks);

  return {
    scene: group,
    skeleton,
    animations: [namasteClip, idleClip],
  };
}
