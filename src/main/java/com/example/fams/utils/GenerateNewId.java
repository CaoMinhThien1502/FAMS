package com.example.fams.utils;

import com.example.fams.models.training.TrainingProgram;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class GenerateNewId {
    //nameId vd (topicCode), idMax nhớ code hàm lấy id lớn nhất nha
    public String generateNewTopicCode(String nameId, String idMax) {
        // Trích xuất số từ mã định danh và tăng giá trị lên 1
        String resultID = null;
        int newId = 1;
        if (idMax != null) {
            try {
                newId = Integer.parseInt(idMax.substring(1)) + 1;
            } catch (NumberFormatException e) {
                // Xử lý nếu không thể chuyển đổi thành số
            }
        }

        if (nameId.equals("topicCode")) {
            resultID = "T" + String.format("%03d", newId);
        } else if (nameId.equals("classCode")) {
            resultID = "C" + String.format("%03d", newId);
        }
        // Xuất mã mới với đúng định dạng
        return resultID;
    }

    public String generateNextTrainingProgramCode(List<TrainingProgram> trainingProgramList, String trainingProgramCode) {
        String prefix = trainingProgramCode.substring(0, 2);
        int currentNumber = Integer.parseInt(trainingProgramCode.substring(2));
        Set<Integer> existingNumbers = new HashSet<>();

        for (TrainingProgram trainingProgram : trainingProgramList) {
            if (trainingProgram.getTrainingProgramCode().startsWith(prefix)) {
                String code = trainingProgram.getTrainingProgramCode().substring(2);
                existingNumbers.add(Integer.parseInt(code));
            }
        }

        if (existingNumbers.isEmpty()) {
            return prefix + "001";
        }

        int nextNumber = currentNumber + 1;
        while (existingNumbers.contains(nextNumber)) {
            nextNumber++;
        }

        return prefix + String.format("%03d", nextNumber);
    }
}
