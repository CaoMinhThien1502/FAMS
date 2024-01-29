package com.example.fams.repositories.user;

import com.example.fams.models.user.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission,Long> {


    @Query("SELECT up FROM UserPermission up WHERE up.permissionId = :roleId")
    UserPermission getUserPermissionById(Long roleId);

    UserPermission findByRole(String role);

}
