package com.example.fams.repositories.user;

import com.example.fams.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query("SELECT user FROM User user WHERE LOWER(user.name) like ?1 || '%' ")
    List<User> findUserByName(String name);
    Optional<User> findByEmail(String username);
    @Query("SELECT user FROM User user WHERE user.name like ?1  ")
    List<User> searchUserByName(String name);
    @Query("SELECT u.name FROM User u JOIN UserPermission up ON up.permissionId = u.role.permissionId WHERE up.role = 'TRAINER' ")
    List<String> listUserTrainer();
    @Query("SELECT u.name FROM User u JOIN UserPermission up ON up.permissionId = u.role.permissionId WHERE up.role = 'ADMIN' ")
    List<String> listUserAdmin();
    @Query("SELECT u FROM User u JOIN UserPermission up ON up.permissionId = u.role.permissionId WHERE up.role = 'ADMIN' ")
    List<User> getUserAdmin();
    @Query("SELECT u FROM User u JOIN UserPermission up ON up.permissionId = u.role.permissionId WHERE up.role = 'TRAINER' ")
    List<User> getUserTrainer();
    @Query("SELECT u.name FROM User u JOIN UserPermission up ON up.permissionId = u.role.permissionId WHERE up.role = 'STUDENT' ")
    List<String> listUserStudent();
    User findByUserId(Long userId);
    @Query("SELECT user FROM User user WHERE user.email = ?1")
    User findUserByEmail(String username);

    @Query("SELECT user FROM User user WHERE user.phone = ?1")
    User findUserByPhone(String phone);
    @Query("SELECT user FROM User user WHERE LOWER(user.name) like ?1 OR LOWER(user.email) LIKE ?1 || '%' ")
    List<User> findUserByNameOrEmail(String name);
}
