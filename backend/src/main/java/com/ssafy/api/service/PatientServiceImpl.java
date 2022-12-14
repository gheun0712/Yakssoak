package com.ssafy.api.service;

import com.ssafy.api.request.CreatePatientPostReq;
import com.ssafy.common.customObject.PatientInfo;
import com.ssafy.db.entity.Patient;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PatientRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 *	환자 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("patientService")
public class PatientServiceImpl implements PatientService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	PatientRepository patientRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public PatientInfo createPatient(CreatePatientPostReq createPatientPostReq) {
		User user = new User();
		Patient patient = new Patient();

		user.setUserId(createPatientPostReq.getPatientId());
		user.setUserPassword(passwordEncoder.encode(createPatientPostReq.getPatientPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		user.setUserName(createPatientPostReq.getPatientName());
		user.setUserEmail(createPatientPostReq.getPatientEmail());
		user.setUserWalletAddress(createPatientPostReq.getPatientWalletAddr());
		user.setUserIdx(0);

		long userSeq = userRepository.save(user).getUserSeq();

		patient.setPatientUserSeq(userSeq);
		patient.setPatientRRN(createPatientPostReq.getPatientRRN());

		long patientUserSeq = patientRepository.save(patient).getPatientUserSeq();

		// patientInfo
		User inputU = userRepository.findUserByUserSeq(userSeq).get();
		Patient inputP = patientRepository.findPatientByPatientUserSeq(patientUserSeq).get();

		PatientInfo patientInfo = new PatientInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputP.getPatientSeq(), inputP.getPatientUserSeq(), inputP.getPatientRRN(), inputP.getREG_DTM(), inputP.getMOD_DTM());

		return patientInfo;
	}

	@Override
	public PatientInfo getPatientInfo(long userSeq) {

		// patientInfo
		User inputU = userRepository.findUserByUserSeq(userSeq).get();
		Patient inputP = patientRepository.findPatientByPatientUserSeq(userSeq).get();

		PatientInfo patientInfo = new PatientInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputP.getPatientSeq(), inputP.getPatientUserSeq(), inputP.getPatientRRN(), inputP.getREG_DTM(), inputP.getMOD_DTM());

		return patientInfo;
	}

	@Override
	public Patient getPatient(long patientUserSeq) {
		return patientRepository.findPatientByPatientUserSeq(patientUserSeq).get();
	}

	// RRN 중복 검사
	@Override
	public boolean existsByPatientRRN(String patientRRN) {
		if (patientRepository.existsByPatientRRN((patientRRN))) {
			return true; // 존재
		}
		return false;
	}

	@Override
	public boolean existsByPatientUserSeq(long patientUserSeq) {
		if (patientRepository.existsByPatientUserSeq((patientUserSeq))) {
			return true; // 존재
		}
		return false;
	}

	// 회원 정보 수정
	@Override
	public PatientInfo updatePatient(long userSeq, CreatePatientPostReq updatePatientPostReq) {

		Optional<User> updatedUser = userRepository.findUserByUserSeq(userSeq);
		Optional<Patient> updatedPatient = patientRepository.findPatientByPatientUserSeq(userSeq);

		updatedUser.get().setUserPassword(passwordEncoder.encode(updatePatientPostReq.getPatientPassword())); // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장
		updatedUser.get().setUserName(updatePatientPostReq.getPatientName());
		updatedUser.get().setUserEmail(updatePatientPostReq.getPatientEmail());
		updatedUser.get().setUserWalletAddress(updatePatientPostReq.getPatientWalletAddr());

		long updatedUserSeq = userRepository.save(updatedUser.get()).getUserSeq();

		updatedPatient.get().setPatientRRN(updatePatientPostReq.getPatientRRN());

		long updatedPatientUserSeq = patientRepository.save(updatedPatient.get()).getPatientUserSeq();

		// patientInfo
		User inputU = userRepository.findUserByUserSeq(updatedUserSeq).get();
		Patient inputP = patientRepository.findPatientByPatientUserSeq(updatedPatientUserSeq).get();

		PatientInfo patientInfo = new PatientInfo(
				inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
				inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
				inputP.getPatientSeq(), inputP.getPatientUserSeq(), inputP.getPatientRRN(), inputP.getREG_DTM(), inputP.getMOD_DTM());

		return patientInfo;
	}

	@Override
	public void deletePatient(long userSeq) {
		userRepository.delete(userRepository.findUserByUserSeq(userSeq).get());
		patientRepository.delete(patientRepository.findPatientByPatientUserSeq(userSeq).get());
	}

	@Override
	public PatientInfo searchPatient(String patientName, String patientRRN) {

		// 주민등록번호로 검색
		Patient inputP = patientRepository.findPatientByPatientRRN(patientRRN).get();

		// 이름 체크
		User inputU = userRepository.findUserByUserSeq(inputP.getPatientUserSeq()).get();
		if (patientName.equals(inputU.getUserName())) {

			// patientInfo
			PatientInfo patientInfo = new PatientInfo(
					inputU.getUserSeq(), inputU.getUserId(), inputU.getUserPassword(), inputU.getUserName(),
					inputU.getUserEmail(), inputU.getUserIdx(), inputU.getUserWalletAddress(), inputU.getREG_DTM(), inputU.getMOD_DTM(),
					inputP.getPatientSeq(), inputP.getPatientUserSeq(), inputP.getPatientRRN(), inputP.getREG_DTM(), inputP.getMOD_DTM());

			return patientInfo;
		}

		return null;
	}
}
