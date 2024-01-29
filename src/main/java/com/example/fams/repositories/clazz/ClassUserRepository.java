package com.example.fams.repositories.clazz;

import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.models.clazz.ClassUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassUserRepository  extends JpaRepository<ClassUser,Long> {
    @Query("SELECT c FROM ClassUser cu, ClassSubject c,User u ,UserPermission up WHERE cu.clazz.classId = c.classId and cu.user.userId = u.userId and u.role.permissionId = up.permissionId and up.role = 'TRAINER' and u.name = ?1")
    List<ClassSubject> findClassUsersByUserType(String trainer);

    List<ClassUser> findClassUsersByClazz_ClassIdAndUserType(Long id, String trainer);
    @Query("SELECT cu FROM ClassUser cu WHERE cu.clazz.classCode like ?1")
    List<ClassUser> findClassUsersByClass(String code);

    Optional<ClassUser> findClassUserByClazz_ClassIdAndUser_UserId(Long classId, Long userId);
}
