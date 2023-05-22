package com.example.ingredient.Repository;

import com.example.ingredient.Model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository  extends JpaRepository<Item, Long> {


    @Query(value = "select i from Item i " +
            "where ((lower(i.name) like lower(:name))" +
            "or ( lower(i.description) like lower(:desc)) )" +
            "and (:min is null or i.price >= :min)" +
            "and(:max is null or i.price <= :max)" +
            "")
    Page<Item> findByBothPriceAndSearch(
            @Param("name")String nameString,
            @Param("desc")String descString,
            @Param("min")Double minPrice,
            @Param("max")Double maxPrice,
            Pageable pageable);



}
