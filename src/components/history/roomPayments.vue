<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Комната</th>
        <th>Сумма</th>
        <th>Год</th>
        <th>Месяц</th>
        <th>Дата</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(r, idx) in records" :key="r.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ r.roomID }}</td>
        <td>{{ r.sum }}</td>
        <td>{{ r.year }}</td>
        <td>{{ r.month }}</td>
        <td>{{ r.timestamp | date("datetime") }}</td>
        <!-- <td>{{ r.description }}</td> -->
        <td>
          <button
            class="btn-small btn"
            @click="$router.push('/detail/' + r.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["records"],
};
</script>
