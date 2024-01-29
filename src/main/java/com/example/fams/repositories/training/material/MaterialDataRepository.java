package com.example.fams.repositories.training.material;

import com.example.fams.models.training.TrainingContent;
import com.example.fams.models.training.material.MaterialData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialDataRepository extends JpaRepository<MaterialData,Long> {
    Optional<MaterialData> findByName(String filename);
    @Query("SELECT md FROM MaterialData md WHERE lower(md.name) like ?1 || '%' ")
    List<MaterialData> findMaterialDataByName(String name);

    @Query("SELECT md FROM MaterialData md WHERE md.trainingContent.content = ?1")
    List<MaterialData> findMaterialDataByTrainingContent(String content);
    @Query("SELECT md FROM MaterialData md WHERE md.name like ?1  ")
    MaterialData checkDuplicate(String name);

    @Query("SELECT md FROM MaterialData md" +
            " JOIN TrainingContent tc ON md.trainingContent = tc" +
            " WHERE tc.id = :contentId")
    List<MaterialData> findMaterialDataByContent(@Param("contentId") Long contentId);

}
